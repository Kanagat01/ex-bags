from rest_framework import serializers
from .models import Contract


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = [
            "id",
            "sign_token",
            "is_signed",
            "signed_at",
            "signed_by_phone",
            "created_at",
        ]


class RequestSmsCodeSerializer(serializers.Serializer):
    pass  # Телефон берётся из application, не нужен в теле запроса


class ConfirmSignatureSerializer(serializers.Serializer):
    code = serializers.CharField(min_length=6, max_length=6)

    def validate_code(self, value: str) -> str:
        if not value.isdigit():
            raise serializers.ValidationError("Код должен состоять из цифр")
        return value