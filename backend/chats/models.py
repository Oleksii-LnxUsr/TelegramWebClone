import uuid
from django.conf import settings
from django.db import models
from django.utils import timezone


class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        formatted_timestamp = self.timestamp.astimezone(timezone.utc).strftime('%y-%m-%d %H:%M:%S')
        return f'{self.sender.username} | {formatted_timestamp}'

class Chat(models.Model):
    uuid = models.UUIDField(primary_key = True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to="chats/avatar/", default="chats/avatar/default-avatar.png")
    members = models.ManyToManyField(settings.AUTH_USER_MODEL)
    messages = models.ManyToManyField(Message)

    def __str__(self):
        return str(self.uuid)
