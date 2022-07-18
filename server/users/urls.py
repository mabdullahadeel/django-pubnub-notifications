from django.urls import path
from rest_framework.authtoken.views import ObtainAuthToken
from . import views as user_views

app_name = 'users'

urlpatterns = [
    path("login", ObtainAuthToken.as_view(), name="login"),
    path("pnn-token", user_views.UserPubNotificationPNView.as_view(), name="pnn-token"), # pnn -> pubnub notification
]

