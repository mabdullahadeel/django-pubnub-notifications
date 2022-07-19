import logging

from users.models import User
from .models import Comment
from django.db.models.signals import post_save
from django.dispatch.dispatcher import receiver
from core.pubnub.pubnub_service import PubNubService

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Comment)
def create_comment_notification(sender, instance, created, **kwargs):
    if created and author != commenter:
        author: User = instance.post.author
        commenter: User = instance.post.user
        
        message = f'{commenter.username} commented on your post.',
        PubNubService.send_notification_to_user(user=author, message=message)
        logger.info("Notification sent to user: %s", author.username)