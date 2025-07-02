from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'polls'

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('users/', views.users, name='users'),
    path('login/', views.user_login, name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('create_post/', views.create_post, name='create_post'),
    path('post_list/', views.post_list, name='post_list'),
]
