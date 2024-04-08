from django.contrib import admin
from django.urls import path, include, re_path


urlpatterns = [
    path('users/', include('users.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),
]
