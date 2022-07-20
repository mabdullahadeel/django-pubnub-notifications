from django.http import HttpRequest
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from core.pubnub.pubnub_service import PubNubService
from users.models import User
from rest_framework import status
from users.serializers import UserPublicSerializer, UserCreateSerializer

class UserMeView(APIView):
    def get(self, request: HttpRequest) -> Response:
        res = PubNubService.get_notification_token_for_user(user=request.user)
        user = UserPublicSerializer(request.user).data
        data = {
            "pn_token": res,
            "user": user
        }
        return Response(data=data, status=200)


class UserCreateAPIView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = (AllowAny,)
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        user = User.objects.get(username=serializer.data['username'])
        token = Token.objects.create(user=user).key
        return Response({"token": token}, status=status.HTTP_201_CREATED, headers=headers)
