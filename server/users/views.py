from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from core.pubnub.pubnub_service import PubNubService

class UserPubNotificationPNView(APIView):
    def get(self, request: HttpRequest) -> Response:
        res = PubNubService.get_notification_token_for_user(user=request.user)
        return Response(data=res, status=200)

