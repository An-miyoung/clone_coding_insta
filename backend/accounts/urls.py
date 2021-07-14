from django.urls import path
from rest_framework import viewsets
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from . import views


urlpatterns = [
    path('signup/', views.SignupView.as_view(), name="signup"),

    # login 기능을 해 줄 jwtToken
    path("token/", obtain_jwt_token),
    path("token/refresh/", refresh_jwt_token),
    path("token/verify/", verify_jwt_token),

    path("suggestions/", 
        views.SuggestionListView.as_view(), 
        name="suggestion_user_list"),
]

