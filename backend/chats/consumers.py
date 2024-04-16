clients = {}
chats = []
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import uuid
import json
from django.utils import timezone
from .services import save_message


class ChatWebSocket(AsyncJsonWebsocketConsumer):
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
                'username': self.scope['user'].username,
                'message': text_data,
                'time_stamp': str(timezone.now())
            }
        )

    async def chat_message(self, event):
        """
        Called when someone has messaged our chat.
        """
        print('Someone send message')
        # Send a message down to the client
        await self.send_json(
            {
                'msg_type': 'chat.send',
                'chat': event['chat_id'],
                'username': event['username'],
                'message': event['message'],
                'time_stamp': event['time_stamp']
            },
        )
        save_message(message=event['message'], user=event['username'])
