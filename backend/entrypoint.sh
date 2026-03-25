#!/bin/sh
set -e  # Останавливаем скрипт при любой ошибке

echo "🚀 Starting Django application..."

# Применяем миграции
echo "Applying database migrations..."
uv run python manage.py migrate --noinput

# Собираем статические файлы
echo "Collecting static files..."
uv run python manage.py collectstatic --noinput --clear

# Опционально: можно добавить создание суперюзера (только в dev)
# if [ "$DJANGO_SUPERUSER_CREATE" = "true" ]; then
#     uv run python manage.py createsuperuser --noinput || true
# fi

echo "✅ Django setup completed successfully!"

# Запускаем то, что передали в CMD (Gunicorn)
exec "$@"