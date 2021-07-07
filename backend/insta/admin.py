from django.contrib import admin
from .models import Post, Comment, Tag


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = ["author", "photo", "caption", "location"]
    list_display_links = ["author", "photo"]


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["author", "message"]


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag
    list_display = ["name"]
