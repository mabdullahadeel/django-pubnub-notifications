from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from core.pubnub.pubnub_service import PubNubService
from users.serializers import UserPublicSerializer

class UserPubNotificationPNView(APIView):
    def get(self, request: HttpRequest) -> Response:
        res = PubNubService.get_notification_token_for_user(user=request.user)
        user = UserPublicSerializer(request.user).data
        data = {
            "pn_token": res,
            "user": user
        }
        return Response(data=data, status=200)

