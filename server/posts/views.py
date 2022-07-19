from multiprocessing import context
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import generics

from posts.serializers import PostSerializer, CommentSerializer
from .models import Post, Comment

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostRetrieve(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'id'


class PostUpdateDestroyView(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'id'
    
    def get_queryset(self):
        return super().get_queryset().filter(author=self.request.user)

class CommentRetrieveCreateView(generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def retrieve(self, request, *args, **kwargs):
        post = get_object_or_404(Post, id=kwargs.get('post_id'))
        comments = Comment.objects.filter(post=post)
        serializer = self.serializer_class(comments, context={'request': request, 'post': post}, many=True)
        return Response(data=serializer.data, status=200)
        
    def create(self, request, *args, **kwargs):
        post = get_object_or_404(Post, id=kwargs.get('post_id'))
        serializer = self.serializer_class(data=request.data, context={'request': request, 'post': post})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=200)
        
        return Response(data=serializer.errors, status=400)

class CommentUpdateDestroyView(generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'id'
    
    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

