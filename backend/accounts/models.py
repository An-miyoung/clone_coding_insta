from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.shortcuts import resolve_url
from django.db import models


class User(AbstractUser):
    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    follower_set = models.ManyToManyField(
        "self", related_name="my_following_set", blank=True, symmetrical=False
    )
    following_set = models.ManyToManyField(
        "self", related_name="my_follower_set", blank=True, symmetrical=False
    )
    avatar = models.ImageField(upload_to="accounts/avatar/%Y/%m/%d", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else :
            return resolve_url("pydenticon_image", self.username)