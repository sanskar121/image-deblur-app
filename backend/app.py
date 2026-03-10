import streamlit as st
import cv2
import numpy as np
from PIL import Image
import io

st.title("✨ Image Clarity Enhancer")

uploaded_file = st.file_uploader("Upload hazy image", type=["jpg","png","jpeg"])

if uploaded_file:
    image = Image.open(uploaded_file)
    image = np.array(image)

    image_bgr = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # CLAHE contrast enhancement
    lab = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)

    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    cl = clahe.apply(l)

    limg = cv2.merge((cl,a,b))
    contrast_img = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)

    # Sharpen
    gaussian = cv2.GaussianBlur(contrast_img, (9,9), 10.0)
    sharpened = cv2.addWeighted(contrast_img, 1.5, gaussian, -0.5, 0)

    result = cv2.cvtColor(sharpened, cv2.COLOR_BGR2RGB)

    col1, col2 = st.columns(2)

    with col1:
        st.subheader("Before")
        st.image(image, width="stretch")

    with col2:
        st.subheader("After (Enhanced)")
        st.image(result, width="stretch")

    #Download Button
    result_pil = Image.fromarray(result)

    buf = io.BytesIO()
    result_pil.save(buf, format="PNG")
    byte_im = buf.getvalue()

    st.download_button(
        label="📥 Download Enhanced Image",
        data=byte_im,
        file_name="enhanced_image.png",
        mime="image/png"
    )