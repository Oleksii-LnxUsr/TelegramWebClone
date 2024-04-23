from django.urls import re_path

from .consumers import ChatWebSocket


websocket_urlpatterns = [
    re_path(r'ws/chats/(?P<chat_id>[0-9a-f-]+)/$', ChatWebSocket.as_asgi()),
]
