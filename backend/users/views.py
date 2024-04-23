from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import filters
from .models import CustomUser
from .serializers import UsersSerializer


class UsersListAPIView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UsersSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['username']

class UserDetailAPIView(RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UsersSerializer
    lookup_field = 'user_uuid'
