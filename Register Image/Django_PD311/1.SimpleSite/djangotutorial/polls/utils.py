from PIL import Image
import io
from django.core.files.base import ContentFile

def optimize_image(image_field, max_size=(800, 800), quality=85):
    
    if not image_field:
        return None

    # Open the image using Pillow
    img = Image.open(image_field)

    # Convert to RGB if necessary (for PNG with transparency)
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        bg = Image.new('RGB', img.size, 'WHITE')
        bg.paste(img, mask=img.getchannel('A') if img.mode == 'RGBA' else img)
        img = bg

    # Calculate new dimensions while maintaining aspect ratio
    ratio = min(max_size[0] / img.size[0], max_size[1] / img.size[1])
    if ratio < 1:
        new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
        img = img.resize(new_size, Image.Resampling.LANCZOS)

    # Save the optimized image
    output = io.BytesIO()
    img.save(output, format='WEBP', quality=quality, optimize=True)
    output.seek(0)

    # Create a new ContentFile with the optimized image
    optimized_image = ContentFile(output.getvalue())
    
    # Generate new filename with .webp extension
    original_name = image_field.name.rsplit('.', 1)[0]
    new_name = f"{original_name}.webp"
    
    return optimized_image, new_name 