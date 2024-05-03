from django.urls import path
from .views import (
    CreateChatAPIView,
    ChatListAPIView,
    ChatDetailAPIView,
    ChatDeleteAPIView,
    MessagesListAPIView
)


urlpatterns = [
    path('create/', CreateChatAPIView.as_view(), name='chat-create'),
    path('list/', ChatListAPIView.as_view(), name='chat-list'),
    path('<slug:chat_uuid>/', ChatDetailAPIView.as_view(), name='chat-detail'),
    path('<slug:chat_uuid>/delete/', ChatDeleteAPIView.as_view(), name='chat-delete'),
    path('<slug:chat_uuid>/messages/', MessagesListAPIView.as_view(), name='chat-messages')
]
