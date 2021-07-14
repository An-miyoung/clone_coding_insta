# from datetime import timedelta
# from django.utils import timezone
from datetime import time, timedelta, timezone
from django.db.models import Q
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer
from .models import Post


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [AllowAny]

    def get_queryset(self):
        # timesince = timezone.now() - timedelta(days=30)
        qs = super().get_queryset
        qs = qs.filter(
            Q(author=self.request.user) | 
            Q(auther__in=self.request.user.following_set.all())
        )
        # qs = qs.filter(created_at__gte=timesince)
        return qs