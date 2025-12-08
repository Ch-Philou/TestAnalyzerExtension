from PIL import Image
import os

source_icon = "icons/icon.png"
sizes = [48, 128]

if not os.path.exists(source_icon):
    print(f"Error: {source_icon} not found.")
    exit(1)

try:
    with Image.open(source_icon) as img:
        print(f"Opened {source_icon}, size: {img.size}")
        for size in sizes:
            new_img = img.resize((size, size), Image.Resampling.LANCZOS)
            output_path = f"icons/icon_{size}.png"
            new_img.save(output_path)
            print(f"Saved {output_path}")
            
    print("Icons resized successfully.")

except Exception as e:
    print(f"An error occurred: {e}")
