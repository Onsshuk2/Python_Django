from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    image = models.ImageField(upload_to='users/', null=True, blank=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return self.email

