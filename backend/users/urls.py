from django.urls import path
from .views import UsersListAPIView, UserDetailAPIView


urlpatterns = [
    path('', UsersListAPIView.as_view()),
    path('detail/<slug:user_uuid>', UserDetailAPIView.as_view())
]
