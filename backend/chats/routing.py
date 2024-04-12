from django.urls import re_path

from .consumers import ChatWebSocket


websocket_urlpatterns = [
    re_path(r'ws/chats/(?P<chat_id>\d+)/$', ChatWebSocket.as_asgi()),
]
