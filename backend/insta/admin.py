from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post, Comment, Tag


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = ["author", "photo_tag", "caption", "location"]
    list_display_links = ["author", "photo_tag", "caption"]

# account 모델에서 avatar_url함수를 만들때는 호출되는 인스턴스 1개가 self로 들어왔는데
# admin class에서는 인스턴스 1개가 아니라 post전체가 post라는 키워드로 들어온다
    def photo_tag(self, post):
        return mark_safe(f"<img src={post.photo.url} style='width:100px;' />")



@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ["author", "message"]


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag
    list_display = ["name"]
