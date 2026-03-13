from django.db.models import QuerySet
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Application, ApplicationStatus
from .serializers import (
    ApproveApplicationSerializer,
    ApplicationDetailSerializer,
    ApplicationListSerializer,
    CreateApplicationSerializer,
    RejectApplicationSerializer,
)
from .services import ApplicationService


class CreateApplicationView(APIView):
    """POST /api/applications — публичный, продавец создаёт заявку"""

    permission_classes = [AllowAny]

    def post(self, request: Request) -> Response:
        serializer = CreateApplicationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Заявка принята! Мы рассмотрим её и свяжемся с вами в ближайшее время."},
            status=status.HTTP_201_CREATED,
        )


class AdminApplicationListView(ListAPIView):
    """GET /api/admin/applications — список заявок для админа"""

    permission_classes = [IsAdminUser]
    serializer_class = ApplicationListSerializer

    def get_queryset(self) -> QuerySet:
        queryset = Application.objects.prefetch_related("photos")

        # Фильтры
        status_filter = self.request.query_params.get("status")
        format_filter = self.request.query_params.get("format")
        date_from = self.request.query_params.get("date_from")
        date_to = self.request.query_params.get("date_to")

        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if format_filter:
            queryset = queryset.filter(format=format_filter)
        if date_from:
            queryset = queryset.filter(created_at__date__gte=date_from)
        if date_to:
            queryset = queryset.filter(created_at__date__lte=date_to)

        return queryset


class AdminApplicationDetailView(RetrieveAPIView):
    """GET /api/admin/applications/:id — детали заявки"""

    permission_classes = [IsAdminUser]
    serializer_class = ApplicationDetailSerializer
    queryset = Application.objects.prefetch_related("photos")


class AdminApproveApplicationView(APIView):
    """POST /api/admin/applications/:id/approve"""

    permission_classes = [IsAdminUser]

    def post(self, request: Request, pk: str) -> Response:
        application = Application.objects.get(pk=pk)

        if application.status != ApplicationStatus.NEW:
            return Response(
                {"detail": "Можно одобрить только новую заявку"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ApproveApplicationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ApplicationService.approve(application, serializer.validated_data["offered_price"])
        return Response({"detail": "Заявка одобрена, уведомление отправлено продавцу"})


class AdminRejectApplicationView(APIView):
    """POST /api/admin/applications/:id/reject"""

    permission_classes = [IsAdminUser]

    def post(self, request: Request, pk: str) -> Response:
        application = Application.objects.get(pk=pk)

        if application.status not in (ApplicationStatus.NEW, ApplicationStatus.OFFER_SENT):
            return Response(
                {"detail": "Нельзя отклонить заявку в текущем статусе"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = RejectApplicationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ApplicationService.reject(application, serializer.validated_data["rejection_reason"])
        return Response({"detail": "Заявка отклонена"})


class AdminContractDownloadView(APIView):
    """GET /api/admin/applications/:id/download"""

    permission_classes = [IsAdminUser]

    def get(self, request: Request, pk: str) -> Response:
        application = Application.objects.get(pk=pk)

        if not hasattr(application, "contract") or not application.contract.is_signed:
            return Response(
                {"detail": "Подписанный договор не найден"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response({"url": application.contract.pdf_file.url})


class AdminContractPreviewView(APIView):
    """GET /api/admin/applications/:id/contract/"""

    permission_classes = [IsAdminUser]

    def get(self, request: Request, pk: int) -> Response:
        application = Application.objects.get(pk=pk)

        if not hasattr(application, "contract"):
            return Response(
                {"detail": "Договор ещё не сформирован"},
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response({"url": application.contract.pdf_file.url})