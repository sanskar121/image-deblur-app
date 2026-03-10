import { useRef, useEffect } from "react";
import axios from "axios";

export default function PhoneCamera() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {

    const startCamera = async () => {
      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (error) {
        alert("Camera access failed: " + error.message);
      }
    };

    startCamera();

  }, []);

  const capture = async () => {

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    const blob = await new Promise(resolve =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    const formData = new FormData();
    formData.append("file", blob, "capture.jpg");

    await axios.post(
      "https://image-deblur-app.onrender.com/process",
      formData
    );

    alert("Image sent to laptop!");

  };

  return (

    <div className="flex flex-col items-center mt-10 text-white">

      <h2 className="text-xl mb-6">
        Capture Photo
      </h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded-xl border border-gray-700"
        width="350"
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <button
        onClick={capture}
        className="mt-4 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg"
      >
        Capture & Send
      </button>

    </div>

  );
}

