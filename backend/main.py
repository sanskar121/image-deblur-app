from fastapi import FastAPI, UploadFile, File
import cv2
import numpy as np
from dehaze import enhance_image
from fastapi.middleware.cors import CORSMiddleware
import base64
import uvicorn

app = FastAPI()

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

    result = enhance_image(img)

    _, buffer = cv2.imencode(".png", result)
    encoded = base64.b64encode(buffer).decode()

    return {"image": f"data:image/png;base64,{encoded}"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=10000)