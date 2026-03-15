from django.core.mail import EmailMessage
from django.conf import settings


class EmailService:

    @staticmethod
    def send_offer_notification(email: str, brand: str, model: str, amount, offer_url: str) -> None:
        if not email:
            return
        msg = EmailMessage(
            subject=f"Предложение по вашей заявке — {brand} {model}",
            body=(
                f"Добрый день!\n\n"
                f"Мы готовы предложить вам {amount} ₽ за вашу сумку {brand} {model}.\n\n"
                f"Перейдите по ссылке, чтобы ознакомиться с условиями и принять решение:\n{offer_url}\n\n"
                f"Ссылка действительна 72 часа."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[email],
        )
        msg.send()

    @staticmethod
    def send_rejection_notification(email: str, brand: str, model: str, reason: str) -> None:
        if not email:
            return
        msg = EmailMessage(
            subject=f"Ответ по вашей заявке — {brand} {model}",
            body=(
                f"Добрый день!\n\n"
                f"К сожалению, мы не можем принять вашу сумку {brand} {model}.\n"
                f"Причина: {reason}\n\n"
                f"Спасибо за обращение."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[email],
        )
        msg.send()

    @staticmethod
    def send_contract_copy(email: str, pdf_path: str, brand: str, model: str) -> None:
        if not email:
            return
        msg = EmailMessage(
            subject=f"Ваш договор — {brand} {model}",
            body="Добрый день!\n\nВо вложении ваш подписанный договор.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[email],
        )
        with open(pdf_path, "rb") as f:
            msg.attach(f"contract_{brand}_{model}.pdf", f.read(), "application/pdf")
        msg.send()

    @staticmethod
    def _get_admin_email() -> str | None:
        from django.contrib.auth.models import User
        admin = User.objects.filter(is_superuser=True).first()
        return admin.email if admin and admin.email else None

    @staticmethod
    def send_new_application_admin_notification(application) -> None:
        admin_email = EmailService._get_admin_email()
        if not admin_email:
            return
        msg = EmailMessage(
            subject=f"Новая заявка — {application.brand} {application.model}",
            body=(
                f"Поступила новая заявка.\n\n"
                f"Бренд: {application.brand}\n"
                f"Модель: {application.model}\n"
                f"Формат: {application.get_format_display()}\n"
                f"Телефон: {application.phone}\n"
                f"Желаемая цена: {application.desired_price} ₽\n\n"
                f"Просмотреть: {settings.FRONTEND_URL}/admin/applications/{application.id}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[admin_email],
        )
        msg.send()

    @staticmethod
    def send_contract_signed_admin_notification(application) -> None:
        admin_email = EmailService._get_admin_email()
        if not admin_email:
            return
        msg = EmailMessage(
            subject=f"Договор подписан — {application.brand} {application.model}",
            body=(
                f"Продавец подписал договор.\n\n"
                f"Бренд: {application.brand}\n"
                f"Модель: {application.model}\n"
                f"Телефон: {application.phone}\n"
                f"Сумма: {application.offered_price} ₽\n\n"
                f"Просмотреть: {settings.FRONTEND_URL}/admin/applications/{application.id}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[admin_email],
        )
        msg.send()