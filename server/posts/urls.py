from django.urls import path
from . import views as post_views

app_name = 'posts'

urlpatterns = [
    path("<int:id>", post_views.PostRetrieve.as_view(), name="posts-detail"),
    path("<int:id>/", post_views.PostUpdateDestroyView.as_view(), name="posts-delete-update"),
    
    path("", post_views.PostListCreateView.as_view(), name="posts-list-create"),
]

