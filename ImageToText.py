from PIL import Image
import pytesseract
from pytesseract import Output
import numpy as np
import cv2

def __main__(path):
    # Insert the file path to your tesseract.exe file here
    pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
    # Insert the file path to your receipt image here
    filename = path
    extracted_text = image_to_text(filename)
    return extracted_text

def image_to_text(input_path):
    img = cv2.imread(input_path)

    """
    A function to read text from images.
    """
    text = pytesseract.image_to_string(denoise(grayscale(img)))
    return text.strip()

# Extract recognized data from easy text
def draw_bounding_boxes(input_img_path, output_path):
   img = cv2.imread(input_img_path)

   # Extract data
   data = pytesseract.image_to_data(denoise(grayscale(img)), output_type=Output.DICT)
   n_boxes = len(data["text"])

   for i in range(n_boxes):
       if data["conf"][i] == -1:
           continue
       # Coordinates
       x, y = data["left"][i], data["top"][i]
       w, h = data["width"][i], data["height"][i]

       # Corners
       top_left = (x, y)
       bottom_right = (x + w, y + h)

       # Box params
       green = (0, 255, 0)
       thickness = 1  # The function-version uses thinner lines

       cv2.rectangle(img, top_left, bottom_right, green, thickness)

   # Save the image with boxes
   cv2.imwrite(output_path, img)

def grayscale(image):
    """Converts an image to grayscale.

    Args:
        image: The input image in BGR format.

    Returns:
        The grayscale image.
    """
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def denoise(image):
    """Reduces noise in the image using a median blur filter.

   Args:
       image: The input grayscale image.

   Returns:
       The denoised image.
   """
    return cv2.medianBlur(image, 5) # Adjust kernel size as needed