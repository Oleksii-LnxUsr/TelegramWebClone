import json
import uuid
from django.utils import timezone
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async
from users.models import CustomUser
from .models import Chat, Message


class ChatWebSocket(AsyncJsonWebsocketConsumer):
    @database_sync_to_async
    def save_message(self, user, message, chat):
        created_message = Message.objects.create(sender=user, text=message)
        chat.messages.add(created_message)
        return created_message

    @database_sync_to_async
    def get_user_by_id(self, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            return user
        except CustomUser.DoesNotExist:
            return None

    @database_sync_to_async
    def get_or_create_chat(self, chat_id, member):
        try:
            chat = Chat.objects.get(uuid=chat_id)
            chat.members.add(member)
        except Chat.DoesNotExist:
            chat = Chat.objects.create(uuid=chat_id, name=member.username, avatar=member.avatar)
            chat.members.add(member)
        return chat

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_group_name = f'chat_{self.chat_id}'
        self.chat_object = await self.get_or_create_chat(self.chat_id, self.scope['user'])

        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.chat_group_name, self.channel_name)

    async def receive(self, text_data):
        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat.message',
                'chat_id': self.chat_id,
                'user_id': self.scope['user'].id,
                'message': text_data,
                'time_stamp': str(timezone.now())
            }
        )

    async def chat_message(self, event):
        user = await self.get_user_by_id(user_id=event['user_id'])
        new_message = await self.save_message(user=user, message=event['message'], chat=self.chat_object)

        if user:
            await self.send_json(
                {
                    'msg_type': 'chat.send',
                    'chat': event['chat_id'],
                    'user_id': user.id,
                    'message': event['message'],
                    'time_stamp': event['time_stamp']
                },
            )
