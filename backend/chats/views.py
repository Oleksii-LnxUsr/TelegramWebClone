from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from users.models import CustomUser
from .models import Message, Chat
from .serializers import ChatSerializer, ChatMessagesSerializer


class IsMemberPermissionMixin:
    '''
    Mixin to check if a user is a member of a chat
    '''
    def check_membership(self, chat):
        if self.request.user not in chat.members.all():
            return Response({'error': 'You are not a member of this chat'}, status=status.HTTP_403_FORBIDDEN)

class ChatListAPIView(ListAPIView):
    '''
    Get a list of the user's chats
    '''
    permission_classes = [IsAuthenticated]
    serializer_class = ChatSerializer

    def get_queryset(self):
        return Chat.objects.filter(members=self.request.user)

class ChatDetailAPIView(IsMemberPermissionMixin, RetrieveAPIView):
    '''
    Get chat details
    '''
    permission_classes = [IsAuthenticated]

    def get(self, request, chat_uuid):
        chat = get_object_or_404(Chat, uuid=chat_uuid)
        self.check_membership(chat)
        serializer = ChatSerializer(chat)
        return Response(serializer.data)

class CreateChatAPIView(CreateAPIView):
    '''
    Create new chat or return if already exists
    '''
    permission_classes = [IsAuthenticated]

    def create(self, request):
        participant_uuid = request.data.get('participant', {}).get('user_uuid')

        if not participant_uuid:
            return Response({'error': 'participant is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            participant = CustomUser.objects.get(user_uuid=participant_uuid)
            user = request.user
            chat = Chat.objects.filter(members__in=[user, participant]).distinct()
            if chat.exists():
                return Response({'message': 'Chat already exists', 'chat_id': chat.first().uuid}, status=status.HTTP_200_OK)
            else:
                new_chat = Chat.objects.create(name=f'{participant.username} and {user.username}')
                new_chat.members.add(user, participant)
                return Response({'message': 'Chat created successfully', 'chat_id': new_chat.uuid}, status=status.HTTP_201_CREATED)

        except Chat.DoesNotExist:
            return Response({'error': 'Participant does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChatDeleteAPIView(IsMemberPermissionMixin, APIView):
    '''
    Delete chat
    '''
    permission_classes = [IsAuthenticated]

    def delete(self, request, chat_uuid):
        chat = get_object_or_404(Chat, uuid=chat_uuid)
        self.check_membership(chat)
        chat.messages.all().delete()
        chat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MessagesListAPIView(ListAPIView):
    '''
    Get a list of messages by chat
    '''
    pagination_class = PageNumberPagination
    permission_classes = [IsAuthenticated]
    serializer_class = ChatMessagesSerializer
    page_size = 2

    def get_queryset(self):
        chat_uuid = self.kwargs['chat_uuid']
        chat = get_object_or_404(Chat, uuid=chat_uuid)
        return chat.messages.all()
