from django.conf import settings
from smsaero import SmsAero, SmsAeroException

class SmsService:

    @classmethod
    def _get_client(cls) -> SmsAero:
        return SmsAero(settings.SMS_AERO_EMAIL, settings.SMS_AERO_API_KEY, settings.SMS_AERO_SIGN)

    @classmethod
    def _send(cls, phone: str, text: str) -> None:
        import logging
        logger = logging.getLogger(__name__)

        try:
            logger.info(f"Отправляем SMS на {phone}: {text}")
            # client = cls._get_client()
            # client.send(phone, text)
        except SmsAeroException as e:
            logger.error(f"SMS отправка не удалась: {e}")

    @classmethod
    def send_offer_notification(cls, phone: str, brand: str, amount: float, offer_url: str) -> None:
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