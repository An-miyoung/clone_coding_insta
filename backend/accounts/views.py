from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import SignupSerializer, SuggestionUserSerializer


User = get_user_model()


class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]


class SuggestionListView(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = SuggestionUserSerializer

    def get_queryset(self):
        qs =  super().get_queryset()
        qs = qs.exclude(pk=self.request.user.pk)
        qs = qs.exclude(pk__in=self.request.user.following_set.all())
        return qs


@api_view(['POST'])
def user_follow(request):
    username = request.data['username']
    follow_user = get_object_or_404( User, username=username, is_active=True )
    request.user.following_set.add(follow_user)
    follow_user.follower_set.add(request.user)
    return Response(status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def user_unfollow(request):
    username = request.data['username']
    follow_user = get_object_or_404( User, username=username , is_active=True)
    request.user.following_set.remove(follow_user)
    follow_user.follower_set.remove(request.user)
    return Response(status.HTTP_204_NO_CONTENT)