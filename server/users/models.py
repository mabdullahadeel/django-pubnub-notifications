from uuid import uuid4
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    id = models.CharField(primary_key=True, default=uuid4, max_length=36, editable=False)
    email = models.EmailField(unique=True)
    
    
    EMAIL_FIELD: str = 'email'
    USERNAME_FIELD: str = 'email'
    REQUIRED_FIELDS = ['username']
    
    def __str__(self) -> str:
        return self.email + " " + self.id
    
    def get_notification_channel_name(self) -> str:
        return f"pn-noti-{self.id}"
    
    class Meta:
        db_table = 'users'


