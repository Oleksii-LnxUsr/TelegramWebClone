from rest_framework import serializers
from .models import Chat, Message


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.ReadOnlyField(source='sender.username')

    class Meta:
        model = Message
        fields = ['sender', 'text', 'timestamp']

class ChatMessagesSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='sender.id')
    message = serializers.CharField(source='text', required=True)

    class Meta:
        model = Message
        fields = ['user_id', 'message', 'timestamp']

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['uuid', 'name', 'avatar']
