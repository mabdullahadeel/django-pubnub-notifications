import logging
from uuid import uuid4

from .models import Comment
from django.db.models.signals import post_save
from django.dispatch.dispatcher import receiver
from core.pubnub.pubnub_service import PubNubService

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Comment)
def create_comment_notification(sender, instance: Comment, created, **kwargs):
    post = instance.post
    author = post.author
    commenter = instance.user
    if created and author != commenter:
    # if author != commenter:
        message = {
            "message": f'{commenter.username} commented on your post.',
            "peek": f'{instance.text[0:10]}...',
            "id": str(uuid4())[0:8],
            "pid": str(post.id),
        },
        PubNubService.send_notification_to_user(user=author, message=message)
        logger.warn("Notification sent to user: %s", author.username)