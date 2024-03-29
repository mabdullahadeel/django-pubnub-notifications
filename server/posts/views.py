from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination

from posts.serializers import PostSerializer, CommentSerializer
from .models import Post, Comment

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = LimitOffsetPagination
    
    def get_queryset(self):
        filter_author = self.request.GET.get('author', 0)
        if (filter_author == "1"):
            return self.queryset.filter(author=self.request.user)
        return super().get_queryset()


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

class CommentsLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 10
    def __init__(self) -> None:
        self.count = 10
        super().__init__()

class CommentRetrieveCreateView(generics.ListCreateAPIView, CommentsLimitOffsetPagination):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = CommentsLimitOffsetPagination
    
    def list(self, request, *args, **kwargs):
        self.count = 10
        post = get_object_or_404(Post, id=kwargs.get('post_id'))
        comments = Comment.objects.filter(post=post)
        res = self.paginate_queryset(comments)
        serializer = self.serializer_class(res, context={'request': request, 'post': post}, many=True)
        return self.get_paginated_response(serializer.data)
        
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

