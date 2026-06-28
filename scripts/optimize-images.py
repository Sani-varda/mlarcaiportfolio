import os
import re
from PIL import Image

def find_references(filename, directory="src"):
    references = []
    pattern = re.compile(re.escape(filename), re.IGNORECASE)
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.js')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        if pattern.search(f.read()):
                            references.append(path)
                except Exception as e:
                    print(f"Error reading {path}: {e}")
    return references

def compress_image(src_path, dest_path, max_width=1920, quality=80):
    try:
        with Image.open(src_path) as img:
            # Check orientation and fix if needed (EXIF)
            try:
                if hasattr(img, '_getexif') and img._getexif() is not None:
                    exif = dict(img._getexif().items())
                    # Orientation tag is 274
                    orientation = exif.get(274)
                    if orientation == 3:
                        img = img.rotate(180, expand=True)
                    elif orientation == 6:
                        img = img.rotate(270, expand=True)
                    elif orientation == 8:
                        img = img.rotate(90, expand=True)
            except Exception as e:
                print(f"EXIF rotation failed: {e}")
            
            # Resize if wider than max_width
            width, height = img.size
            if width > max_width:
                ratio = max_width / width
                new_size = (max_width, int(height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
                print(f"Resized image from {width}x{height} to {new_size[0]}x{new_size[1]}")
            
            # Save as WebP
            img.save(dest_path, "WEBP", quality=quality)
            src_size = os.path.getsize(src_path)
            dest_size = os.path.getsize(dest_path)
            print(f"Compressed {src_path} ({src_size/1024/1024:.2f}MB) -> {dest_path} ({dest_size/1024:.2f}KB) | Ratio: {dest_size/src_size*100:.2f}%")
            return True
    except Exception as e:
        print(f"Error compressing {src_path}: {e}")
        return False

def main():
    images = [
        "Cinematic_portrait_with_high-contrast_dual-tone_202606090311 (2).jpeg",
        "Cinematic_portrait_with_high-contrast_dual-tone_202606090311.jpeg",
        "Cinematic_portrait_with_high-contrast_dual-tone_202606090312.jpeg"
    ]
    
    public_img_dir = "public/images"
    
    for img in images:
        refs = find_references(img)
        print(f"References for {img}: {refs}")
        
    # Compress the active background image
    active_bg = os.path.join(public_img_dir, "Cinematic_portrait_with_high-contrast_dual-tone_202606090312.jpeg")
    dest_bg = os.path.join(public_img_dir, "background.webp")
    
    if os.path.exists(active_bg):
        compress_image(active_bg, dest_bg)
    else:
        print(f"Active background image not found: {active_bg}")

if __name__ == "__main__":
    main()
