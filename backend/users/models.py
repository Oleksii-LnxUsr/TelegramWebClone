from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager
import uuid


class CustomUser(AbstractBaseUser, PermissionsMixin):
    user_uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(default="users/avatar/default-avatar.png", upload_to="users/avatar/")
    referral_code = models.UUIDField(default=uuid.uuid4, unique=True)
    referred_by = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='referrals')
    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'avatar']

    def __str__(self):
        return f'{self.username} | {self.email}'
