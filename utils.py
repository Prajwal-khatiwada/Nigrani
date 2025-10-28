import os
import cv2

def check_file_exists(filepath):
    """Check if a file exists."""
    return os.path.exists(filepath)

def resize_frame(frame, width, height):
    """Resize a video frame."""
    return cv2.resize(frame, (width, height))
