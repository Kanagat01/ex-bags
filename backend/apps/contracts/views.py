from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Contract
from .serializers import ConfirmSignatureSerializer
from .services import ContractService
from apps.notifications.services.sms import SmsService


class ContractPreviewView(APIView):
    """GET /api/sign/:token/contract — получить договор для просмотра"""

    permission_classes = [AllowAny]

    def get(self, request: Request, token: str) -> Response:
        try:
            contract = Contract.objects.get(sign_token=token)
        except Contract.DoesNotExist:
            return Response({"detail": "Договор не найден"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"url": contract.pdf_file.url})


class RequestSmsCodeView(APIView):
    """POST /api/sign/:token/request-code"""

    permission_classes = [AllowAny]

    def post(self, request: Request, token: str) -> Response:
        try:
            contract = Contract.objects.select_related("application").get(sign_token=token)
        except Contract.DoesNotExist:
            return Response({"detail": "Договор не найден"}, status=status.HTTP_404_NOT_FOUND)

        try:
            sms_code = ContractService.request_sms_code(contract)
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        SmsService.send_sign_code(contract.application.phone, sms_code.code)

        return Response({"detail": "Код отправлен"})


class ConfirmSignatureView(APIView):
    """POST /api/sign/:token/confirm"""

    permission_classes = [AllowAny]

    def post(self, request: Request, token: str) -> Response:
        try:
            contract = Contract.objects.select_related("application").get(sign_token=token)
        except Contract.DoesNotExist:
            return Response({"detail": "Договор не найден"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ConfirmSignatureSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            ContractService.confirm_signature(contract, serializer.validated_data["code"])
        except ValueError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Договор успешно подписан"})