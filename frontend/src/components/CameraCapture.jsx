import Webcam from "react-webcam";
import { useRef } from "react";
import axios from "axios";

export default function CameraCapture({ setOriginal, setResult, setLoading }) {

  const webcamRef = useRef(null);

  const capture = async () => {

    const imageSrc = webcamRef.current.getScreenshot();

    setOriginal(imageSrc);
    setLoading(true);

    const blob = await fetch(imageSrc).then(res => res.blob());

    const formData = new FormData();
    formData.append("file", blob, "capture.jpg");

    const res = await axios.post(
      "https://image-deblur-app.onrender.com/process",
      formData
    );

    setResult(res.data.image);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-10">

      <h3 className="mb-4 text-lg">Capture using Laptop Camera</h3>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-xl border border-gray-700"
        width={350}
      />

      <button
        onClick={capture}
        className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg"
      >
        Capture Photo
      </button>

    </div>
  );
}

