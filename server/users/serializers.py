from django.contrib.auth.hashers import make_password
from rest_framework import serializers 
from .models import User


class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password", "is_superuser", "date_joined", "groups", "user_permissions")
        

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=45, write_only=True)
    class Meta:
        model = User
        fields = ("username", "email", "password")
        
        
    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
    