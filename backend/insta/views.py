# from datetime import timedelta
# from django.utils import timezone
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import PostSerializer, CommentSerializer
from .models import Post, Comment


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().select_related('author').prefetch_related('tag_set', "like_user_set")
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    # serializer에 requset를 전달해 주기 위해 viewset에서 사용
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["requset"] = self.request
        return context

    # def get_queryset(self):
        # timesince = timezone.now() - timedelta(days=30)
        # qs = super().get_queryset
        # qs = qs.filter(
        #     Q(author=self.request.user) | 
        #     Q(auther__in=self.request.user.following_set.all())
        # )
        # qs = qs.filter(created_at__gte=timesince)
        # return qs

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)
        return super().perform_create(serializer)

    # def perform_create(self, serializer):
    #     caption = self.request.data['caption']
    #     post = self.get_object() 아직 포스트가 만들어지지 않았는데 불러오고 있다.
    #     tag_set = post.extract_tag_set(caption)
    #     serializer.save(author = self.request.user, tag_set = tag_set)
    #     return super().perform_create(serializer)


    @action(detail=True, methods=["POST"])
    def like(self, request, pk):
        post = self.get_object()
        post.like_user_set.add(self.request.user)
        return Response(status.HTTP_201_CREATED)

    @like.mapping.delete
    def unlike(self, request, pk):
        post = self.get_object()
        post.like_user_set.remove(self.request.user)
        return Response(status.HTTP_204_NO_CONTENT)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["requset"] = self.request
        return context
    
    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs['post_pk'])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs['post_pk'])
        serializer.save(author = self.request.user, post = post)
        return super().perform_create(serializer)
