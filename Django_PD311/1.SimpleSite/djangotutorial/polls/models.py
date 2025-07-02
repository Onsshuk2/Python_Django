from django.db import models
from django.utils import timezone
import datetime
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    image_small = models.ImageField(upload_to='users/', null=True, blank=True)
    image_medium = models.ImageField(upload_to='users/', null=True, blank=True)
    image_large = models.ImageField(upload_to='users/', null=True, blank=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    # def save(self, *args, **kwargs):
    #     if self.image_small:
    #         optimized_image, new_name = optimize_image(self.image_small, size=(300, 300))
    #         if optimized_image and new_name:
    #             self.image_small.save(new_name, optimized_image, save=False)

    #     if self.image_medium:
    #         optimized_image, new_name = optimize_image(self.image_medium, size=(600, 600))
    #         if optimized_image and new_name:
    #             self.image_medium.save(new_name, optimized_image, save=False)

    #     if self.image_large:
    #         optimized_image, new_name = optimize_image(self.image_large, size=(1200, 1200))
    #         if optimized_image and new_name:
    #             self.image_large.save(new_name, optimized_image, save=False)

    #     super().save(*args, **kwargs)
        

    def __str__(self):
        return self.email

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='posts/', null=True, blank=True)  # Додаємо зображення
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title