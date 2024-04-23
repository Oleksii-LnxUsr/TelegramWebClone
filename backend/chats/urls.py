from django.urls import path
from .views import CreateChatAPIView, ChatListAPIView, ChatDetailAPIView, MessagesListAPIView

urlpatterns = [
    path('create/', CreateChatAPIView.as_view()),
    path('list/', ChatListAPIView.as_view()),
    path('<slug:chat_uuid>/', ChatDetailAPIView.as_view()),
    path('<slug:chat_uuid>/messages/', MessagesListAPIView.as_view())
]
