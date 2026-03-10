import cv2
import numpy as np

def enhance_image(image):

    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)

    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    cl = clahe.apply(l)

    limg = cv2.merge((cl,a,b))
    contrast_img = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)

    gaussian = cv2.GaussianBlur(contrast_img, (9,9), 10.0)
    sharpened = cv2.addWeighted(contrast_img, 1.5, gaussian, -0.5, 0)

    return sharpened