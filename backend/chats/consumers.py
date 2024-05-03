import json
import uuid
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.db import transaction
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
        return get_object_or_404(CustomUser, id=user_id)

    @database_sync_to_async
    def get_chat(self, chat_id):
        try:
            chat = get_object_or_404(Chat, uuid=chat_id)
            return chat
        except:
            return None

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_group_name = f'chat_{self.chat_id}'
        self.chat_object = await self.get_chat(chat_id=self.chat_id)

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
                'user_id': self.scope['user'].id, # Decoded JWT user data
                'message': text_data,
                'timestamp': str(timezone.now())
            }
        )

    async def chat_message(self, event):
        user = await self.get_user_by_id(user_id=event['user_id'])
        new_message = await self.save_message(user=user, message=event['message'], chat=self.chat_object)
        print(event['message'], 'RECIVED MESSAGE')

        if user:
            await self.send_json(
                {
                    'msg_type': event['type'],
                    'user_id': user.id,
                    'message': event['message'],
                    'timestamp': event['timestamp']
                },
            )
