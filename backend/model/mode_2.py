import base64
from io import BytesIO
import numpy as np
from PIL import Image, ImageOps
from scipy.ndimage import center_of_mass


def preprocess_and_predict(b64_string: str,scaler=None):
  # 1. Clean Base64 string
  if "," in b64_string:
    b64_string = b64_string.split(",")[1]

  image_bytes = base64.b64decode(b64_string, validate=True)
  raw_img = Image.open(BytesIO(image_bytes))

  # 2. Fix Canvas Transparency: Composite onto a solid WHITE background
  if raw_img.mode in ("RGBA", "LA") or (
      raw_img.mode == "P" and "transparency" in raw_img.info
  ):
    rgba_img = raw_img.convert("RGBA")
    white_bg = Image.new("RGBA", rgba_img.size, (255, 255, 255, 255))
    composite = Image.alpha_composite(white_bg, rgba_img)
    img = composite.convert("L")
  else:
    img = raw_img.convert("L")

  # 3. Invert to MNIST standard: White strokes on pure Black background
  img_arr = np.array(img, dtype=np.float32)
  if img_arr.mean() > 127:
    img = ImageOps.invert(img)

  # 4. Crop to drawn digit bounding box
  bbox = img.getbbox()
  if bbox is None:
    return {"error": "Canvas is completely blank"}

  img = img.crop(bbox)

  # 5. Proportional resize to 20x20
  w, h = img.size
  if w > h:
    new_w = 20
    new_h = max(1, int(round((20.0 / w) * h)))
  else:
    new_h = 20
    new_w = max(1, int(round((20.0 / h) * w)))

  img = img.resize((new_w, new_h), Image.Resampling.BICUBIC)

  # 6. Paste into 28x28 black canvas
  padded = Image.new("L", (28, 28), 0)
  padded.paste(img, ((28 - new_w) // 2, (28 - new_h) // 2))
  arr = np.array(padded, dtype=np.float32)

  # 7. Center of Mass Shift
  center = np.asarray(center_of_mass(arr), dtype=np.float64)
  cy = float(center[0])
  cx = float(center[1])
  if not np.isnan(cy) and not np.isnan(cx):
    shift_x = int(round(14.0 - cx))
    shift_y = int(round(14.0 - cy))
    arr = np.roll(arr, shift_y, axis=0)
    arr = np.roll(arr, shift_x, axis=1)

  # --- DEBUG CONSOLE VISUALIZER ---
  # Look at your console output when calling this:
  print("\n--- Model Input Visualizer (28x28) ---")
  for row in arr:
    print("".join(["#" if pixel > 80 else " " for pixel in row]))
  print(
      f"Pixel Range -> Min: {arr.min():.1f}, Max: {arr.max():.1f}, Mean:"
      f" {arr.mean():.2f}\n"
  )

  # 8. Prepare for inference
  features = arr.reshape(1, 784)

  # If you fitted with StandardScaler, pass scaler; otherwise leave None
  if scaler is not None:
    features = scaler.transform(features)

  return features