import logging

from django.conf import settings
from pubnub.models.consumer.v3.channel import Channel
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from pubnub.exceptions import PubNubException

from users.models import User

logger = logging.getLogger(__name__)

pnconfig = PNConfiguration()

pnconfig.publish_key = settings.PUBNUB_PUBLISH_KEY
pnconfig.subscribe_key = settings.PUBNUB_SUBSCRIBE_KEY
pnconfig.secret_key = settings.PUBNUB_SECRET
pnconfig.uuid = settings.SERVER_PUBNUB_UUID

pubnub = PubNub(pnconfig)

class PubNubService:
    DEFAULT_NOTIFICATION_TTL = 60 # 60 minutes
    
    @staticmethod
    def get_notification_token_for_user(user: User, ttl: int = DEFAULT_NOTIFICATION_TTL):
        envalope = pubnub.grant_token() \
            .channels([Channel.id(user.get_notification_channel_name()).read().delete()]) \
            .ttl(ttl) \
            .authorized_uuid(user.get_notification_channel_name()) \
            .sync()
        token = envalope.result.token
        token_payload = pubnub.parse_token(token)
        
        return {
            "exp_timestamp": token_payload["timestamp"],
            "token": token,
            "ttl": token_payload["ttl"],
        }
    
    @staticmethod
    def send_notification_to_user(user: User, message):
        try:
            pubnub.publish() \
            .channel(user.get_notification_channel_name()) \
            .message(message) \
            .use_post()
        except PubNubException as e:
            logger.error(e)
