from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Category
from .serializers import CategorySerializer



class CategoryViewSet(ModelViewSet):
    
    queryset = Category.objects.all()
    print("CategoryViewSet")
    serializer_class = CategorySerializer


