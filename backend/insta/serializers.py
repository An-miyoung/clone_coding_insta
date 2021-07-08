from rest_framework import serializers
from .models import Post, Comment, Tag


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['author', 'photo', 'caption', 'location']