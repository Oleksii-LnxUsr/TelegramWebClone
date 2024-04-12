import uuid
from django.conf import settings
from django.db import models


class Message(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.sender.username

class Chat(models.Model):
    uuid = models.UUIDField(primary_key = True, default=uuid.uuid4)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL)
    messages = models.ManyToManyField(Message)

    def __str__(self):
        return self.pk
