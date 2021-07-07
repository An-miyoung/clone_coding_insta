from django.db import models
from django.conf import settings


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(TimestampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="my_post_set", on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='insta/post/%Y/%m/%d')
    caption = models.CharField(max_length=500)
    location = models.CharField(max_length=100)
    tag_set = models.ManyToManyField('Tag', blank=True)
    like_user_set = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_post_set", blank=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.caption


class Comment(TimestampedModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["-id"]


class Tag(TimestampedModel):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name