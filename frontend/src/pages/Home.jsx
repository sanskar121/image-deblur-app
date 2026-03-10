import { useState, useEffect } from "react"
import UploadBox from "../components/UploadBox"
import CameraCapture from "../components/CameraCapture"
import QRScanner from "../components/QRScanner"

export default function Home() {

  const [mode, setMode] = useState("home")
  const [original, setOriginal] = useState(null)
  const [enhanced, setEnhanced] = useState(null)

  // Poll backend when using phone mode
  useEffect(() => {

    if(mode !== "phone") return

    const interval = setInterval(() => {

      fetch("https://image-deblur-app.onrender.com/original")
      .then(res => {
        if(res.headers.get("content-type") === "image/jpeg"){
          return res.blob()
        }
      })
      .then(blob => {
        if(blob){
          setOriginal(URL.createObjectURL(blob))
        }
      })

      fetch("https://image-deblur-app.onrender.com/latest")
      .then(res => {
        if(res.headers.get("content-type") === "image/jpeg"){
          return res.blob()
        }
      })
      .then(blob => {
        if(blob){
          setEnhanced(URL.createObjectURL(blob))
        }
      })

    },3000)

    return () => clearInterval(interval)

  },[mode])



  /* ---------------- LANDING PAGE ---------------- */

  if(mode === "home"){

    return(

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-6">

        <h1 className="text-5xl font-bold mb-4 text-center">
          AI Image Dehazing
        </h1>

        <p className="text-gray-400 text-lg text-center max-w-xl mb-10">
          Remove haze, fog and low contrast from images instantly using
          AI powered enhancement. Upload images or capture directly
          from your camera.
        </p>


        {/* BUTTON OPTIONS */}

        <div className="flex flex-col gap-4 w-[320px]">

          <button
          onClick={()=>setMode("upload")}
          className="bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold transition">
            Upload Image
          </button>

          <button
          onClick={()=>setMode("camera")}
          className="bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold transition">
            Capture From Laptop Camera
          </button>

          <button
          onClick={()=>setMode("phone")}
          className="bg-purple-500 hover:bg-purple-600 py-3 rounded-xl font-semibold transition">
            Capture From Phone (QR)
          </button>

        </div>


        {/* FEATURES */}

        <div className="grid grid-cols-3 gap-8 mt-14 text-center">

          <div>
            <div className="text-3xl">⚡</div>
            <p className="text-sm text-gray-400 mt-2">
              Fast AI Processing
            </p>
          </div>

          <div>
            <div className="text-3xl">🔒</div>
            <p className="text-sm text-gray-400 mt-2">
              Privacy Friendly
            </p>
          </div>

          <div>
            <div className="text-3xl">📷</div>
            <p className="text-sm text-gray-400 mt-2">
              Upload or Camera
            </p>
          </div>

        </div>


        {/* INSTRUCTIONS */}

        <div className="mt-16 text-gray-500 text-sm text-center max-w-lg">

          <p>
          1. Upload or capture a hazy image
          </p>

          <p>
          2. Our AI enhances contrast and removes haze
          </p>

          <p>
          3. View before & after comparison instantly
          </p>

        </div>

      </div>

    )
  }



  /* ---------------- UPLOAD MODE ---------------- */

  if(mode === "upload"){

    return(

      <div className="min-h-screen bg-gray-900 text-white p-10">

        <button
        onClick={()=>setMode("home")}
        className="mb-8 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">
          Back
        </button>

        <UploadBox/>

      </div>

    )
  }



  /* ---------------- LAPTOP CAMERA MODE ---------------- */

  if(mode === "camera"){

    return(

      <div className="min-h-screen bg-gray-900 text-white p-10">

        <button
        onClick={()=>setMode("home")}
        className="mb-8 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">
          Back
        </button>

        <CameraCapture/>

      </div>

    )
  }



  /* ---------------- PHONE QR MODE ---------------- */

  if(mode === "phone"){

    return(

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">

        <button
        onClick={()=>setMode("home")}
        className="self-start mb-6 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600">
          Back
        </button>

        <h1 className="text-3xl font-bold mb-4">
          Capture Using Phone
        </h1>

        <p className="text-gray-400 mb-6 text-center">
          Scan the QR code using your phone camera
          and capture an image.
        </p>

        <QRScanner/>

        {/* RESULT VIEW */}

        <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl mt-10">

          <div className="bg-gray-800 rounded-xl p-4">

            <h2 className="text-xl mb-3">Original</h2>

            {original ? (
              <img src={original} className="rounded-lg w-full"/>
            ) : (
              <p className="text-gray-500">
                Waiting for image...
              </p>
            )}

          </div>

          <div className="bg-gray-800 rounded-xl p-4">

            <h2 className="text-xl mb-3">Enhanced</h2>

            {enhanced ? (
  <div className="flex flex-col gap-4">

    <img
      src={enhanced}
      className="rounded-lg w-full"
    />

    <a
      href={enhanced}
      download="enhanced-image.jpg"
      className="bg-green-500 hover:bg-green-600 text-center py-2 rounded-lg font-semibold transition"
    >
      Download Enhanced Image
    </a>

  </div>
) : (
  <p className="text-gray-500">
    Processing...
  </p>
)}

          </div>

        </div>

      </div>

    )

  }

}