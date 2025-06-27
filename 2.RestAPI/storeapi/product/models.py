from django.db import models
from django.urls import reverse
from PIL import Image
import io
from django.core.files.base import ContentFile

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
    
        super().save(*args, **kwargs)

        if self.image:
            img = Image.open(self.image.path)
          
            img = img.convert("RGB") 
            output_io = io.BytesIO()
            img.save(output_io, format='WEBP', quality=80)

         
            new_image_name = self.image.name.rsplit('.', 1)[0] + '.webp'

            self.image.save(new_image_name, ContentFile(output_io.getvalue()), save=False)

            super().save(update_fields=['image'])  
    
    class Meta:
        ordering = ['name']


