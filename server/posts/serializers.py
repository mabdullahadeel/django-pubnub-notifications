from django.http import HttpRequest
from rest_framework import serializers
from .models import Post, Comment
from users.serializers import UserPublicSerializer

class PostSerializer(serializers.ModelSerializer):
    author = UserPublicSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'text', 'author', 'created_at', 'updated_at')
    
    def create(self, validated_data):
        user = None
        request: HttpRequest = self.context.get('request', None)
        
        if request and hasattr(request, 'user'):
            user = request.user
            
        validated_data['author'] = user
        return super().create(validated_data)
    
class CommentSerializer(serializers.ModelSerializer):
    user= UserPublicSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ('text', 'id', 'created_at', 'updated_at', 'user', 'post')
        read_only_fields = ('id', 'created_at', 'updated_at', 'user', 'post')
        
        
    def create(self, validated_data):
        user = None
        request: HttpRequest = self.context.get('request', None)
        
        if request and hasattr(request, 'user'):
            user = request.user
            
        validated_data['user'] = user
        post = self.context.get('post', None)
        
        return Comment.objects.create(**validated_data, post=post)
