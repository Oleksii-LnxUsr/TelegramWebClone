from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from users.models import CustomUser
from .models import Message, Chat
from .serializers import ChatSerializer, ChatMessagesSerializer


class ChatListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatSerializer

    def get_queryset(self):
        return Chat.objects.filter(members=self.request.user)

class ChatDetailAPIView(APIView):
    def get(self, request, chat_uuid):
        permission_classes = [IsAuthenticated]
        chat = get_object_or_404(Chat, uuid=chat_uuid)
        serializer = ChatSerializer(chat)
        return Response(serializer.data)

class CreateChatAPIView(APIView):
    def post(self, request):
        if 'participant' not in request.data:
            return Response({"error": "participant is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            participant = CustomUser.objects.get(user_uuid=request.data['participant']['user_uuid'])
            user = request.user
            chat = Chat.objects.filter(members__in=[user, participant]).distinct()
            if chat.exists():
                return Response({"message": "Chat already exists", "chat_id": chat.first().uuid}, status=status.HTTP_200_OK)
            else:
                new_chat = Chat.objects.create()
                new_chat.members.add(user, participant)
                return Response({"message": "Chat created successfully", "chat_id": new_chat.uuid}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MessagesListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatMessagesSerializer

    def get_queryset(self):
        chat_uuid = self.kwargs['chat_uuid']
        chat = Chat.objects.get(uuid=chat_uuid)
        messages = chat.messages.all()
        return messages
