import requests
from django.conf import settings


class SmsService:

    BASE_URL = "https://gate.smsaero.ru/v2"

    @classmethod
    def _send(cls, phone: str, text: str) -> None:
        response = requests.get(
            f"{cls.BASE_URL}/sms/send",
            params={
                "number": phone,
                "text": text,
                "sign": settings.SMS_AERO_SIGN,
            },
            auth=(settings.SMS_AERO_EMAIL, settings.SMS_AERO_API_KEY),
            timeout=10,
        )
        response.raise_for_status()

    @classmethod
    def send_offer_notification(cls, phone: str, brand: str, amount, offer_url: str) -> None:
        text = f"{brand} — мы предлагаем {amount} ₽. Перейдите: {offer_url}"
        cls._send(phone, text)

    @classmethod
    def send_rejection_notification(cls, phone: str, brand: str) -> None:
        text = f"К сожалению, мы не можем принять вашу сумку {brand}. Спасибо за обращение."
        cls._send(phone, text)

    @classmethod
    def send_sign_code(cls, phone: str, code: str) -> None:
        text = f"Код подписания договора: {code}. Действует 5 минут."
        cls._send(phone, text)