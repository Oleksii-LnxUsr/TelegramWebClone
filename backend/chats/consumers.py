from channels.generic.websocket import AsyncJsonWebsocketConsumer
import uuid
import json
from django.utils import timezone
from asgiref.sync import sync_to_async
from .models import Message
from users.models import CustomUser


class ChatWebSocket(AsyncJsonWebsocketConsumer):
    @sync_to_async
    def save_message(self, user, message):
        return Message.objects.create(sender=user, text=message)

    @sync_to_async
    def get_user_by_id(self, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            return user
        except CustomUser.DoesNotExist:
            return None

    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_group_name = f'chat_{self.chat_id}'

        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.chat_group_name, self.channel_name)

    async def receive(self, text_data):
        print('RECIVE CALLED', text_data)
        # await self.send_json({'message': 'Hello from Socket99'})
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
        """
        Called when someone has messaged our chat.
        """
        # Send a message down to the client
        user = await self.get_user_by_id(user_id=event['user_id'])
        new_message = await self.save_message(user=user, message=event['message'])

        if user:
            await self.send_json(
                {
                    'msg_type': 'chat.send',
                    'chat': event['chat_id'],
                    'username': user.username,
                    'message': event['message'],
                    'time_stamp': event['time_stamp']
                },
            )
