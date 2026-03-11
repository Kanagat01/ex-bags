from django.urls import path
from .views import OfferDetailView, OfferAcceptView, OfferDeclineView, PersonalDataView

urlpatterns = [
    path("offer/<uuid:token>/", OfferDetailView.as_view(), name="offer-detail"),
    path("offer/<uuid:token>/accept/", OfferAcceptView.as_view(), name="offer-accept"),
    path("offer/<uuid:token>/decline/", OfferDeclineView.as_view(), name="offer-decline"),
    path("offer/<uuid:token>/personal-data/", PersonalDataView.as_view(), name="offer-personal-data"),
]