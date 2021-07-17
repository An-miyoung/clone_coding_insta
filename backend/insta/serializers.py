from django.contrib.auth import get_user_model
from rest_framework import fields, serializers
from .models import Post, Comment, Tag


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [ 'username', 'name', 'avatar_url']


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
        # ['author', 'photo', 'caption', 'location']