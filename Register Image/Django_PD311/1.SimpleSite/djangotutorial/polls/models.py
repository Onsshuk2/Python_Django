from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import AbstractUser
from .utils import optimize_image

class CustomUser(AbstractUser):
    image = models.ImageField(upload_to='users/', null=True, blank=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        if self.image:
            # Optimize the image before saving
            optimized_image, new_name = optimize_image(self.image)
            if optimized_image:
                self.image.save(new_name, optimized_image, save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email 
