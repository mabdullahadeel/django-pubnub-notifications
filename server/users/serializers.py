from rest_framework.serializers import ModelSerializer
from .models import User


class UserPublicSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ("password", "is_superuser", "date_joined", "groups", "user_permissions")