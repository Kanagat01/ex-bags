from django.urls import path
from .views import ContractPreviewView, RequestSmsCodeView, ConfirmSignatureView

urlpatterns = [
    path("sign/<uuid:token>/contract/", ContractPreviewView.as_view(), name="contract-preview"),
    path("sign/<uuid:token>/request-code/", RequestSmsCodeView.as_view(), name="contract-request-code"),
    path("sign/<uuid:token>/confirm/", ConfirmSignatureView.as_view(), name="contract-confirm"),
]