from django.db import models
from users.models import User

class Post(models.Model):
    author: User = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author")
    title = models.CharField(max_length=255)
    text = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}-{self.title}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'
        db_table = "posts"
        
        
class Comment(models.Model):
    post: Post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post")
    user: User = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id}-{self.text}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
        db_table = "comments"
