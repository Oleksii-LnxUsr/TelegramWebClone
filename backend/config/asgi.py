import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django
django.setup()

from django.core.management import call_command
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddleware
from channels.security.websocket import AllowedHostsOriginValidator
from .middleware import JwtAuthMiddleware
from chats import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')


asgi = get_asgi_application()

application = ProtocolTypeRouter({
    "http": asgi,
    "websocket": AllowedHostsOriginValidator(
        JwtAuthMiddleware(
            URLRouter(routing.websocket_urlpatterns))),
})
