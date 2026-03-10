from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import cv2
import numpy as np

app = FastAPI()

# Store latest images
latest_original = None
latest_result = None

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process")
async def process_image(file: UploadFile = File(...)):

    contents = await file.read()

    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    # CLAHE contrast enhancement
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)

    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    cl = clahe.apply(l)

    limg = cv2.merge((cl,a,b))
    contrast_img = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)

    gaussian = cv2.GaussianBlur(contrast_img,(9,9),10)
    sharpened = cv2.addWeighted(contrast_img,1.5,gaussian,-0.5,0)

    # Encode image
    _, buffer = cv2.imencode(".jpg", sharpened)

    return Response(
        content=buffer.tobytes(),
        media_type="image/jpeg"
    )


@app.get("/latest")
def get_latest_result():
    global latest_result

    if latest_result is None:
        return {"status": "no image"}

    return Response(content=latest_result, media_type="image/jpeg")


@app.get("/original")
def get_original():
    global latest_original

    if latest_original is None:
        return {"status": "no image"}

    return Response(content=latest_original, media_type="image/jpeg")