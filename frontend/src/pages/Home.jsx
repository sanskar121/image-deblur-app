import { useState, useEffect } from "react"
import UploadBox from "../components/UploadBox"
import CameraCapture from "../components/CameraCapture"
import QRScanner from "../components/QRScanner"

export default function Home() {

  const [mode, setMode] = useState("home")
  const [original, setOriginal] = useState(null)
  const [enhanced, setEnhanced] = useState(null)

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

    return ()=>clearInterval(interval)

  },[mode])



  /* HOME SCREEN */

  if(mode === "home"){

    return(

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">

        <h1 className="text-4xl font-bold">
          AI Image Dehazing
        </h1>

        <p className="text-gray-400">
          Choose how you want to upload image
        </p>

        <div className="flex flex-col gap-4 mt-6">

          <button
          onClick={()=>setMode("upload")}
          className="bg-blue-500 px-6 py-3 rounded-xl">
            Upload Image
          </button>

          <button
          onClick={()=>setMode("camera")}
          className="bg-green-500 px-6 py-3 rounded-xl">
            Capture From Laptop Camera
          </button>

          <button
          onClick={()=>setMode("phone")}
          className="bg-purple-500 px-6 py-3 rounded-xl">
            Capture From Phone (QR)
          </button>

        </div>

      </div>

    )
  }



  /* UPLOAD MODE */

  if(mode === "upload"){
    return(
      <div className="min-h-screen bg-gray-900 text-white p-10">

        <button
        onClick={()=>setMode("home")}
        className="mb-6 bg-gray-700 px-4 py-2 rounded">
          Back
        </button>

        <UploadBox/>

      </div>
    )
  }



  /* LAPTOP CAMERA */

  if(mode === "camera"){
    return(
      <div className="min-h-screen bg-gray-900 text-white p-10">

        <button
        onClick={()=>setMode("home")}
        className="mb-6 bg-gray-700 px-4 py-2 rounded">
          Back
        </button>

        <CameraCapture/>

      </div>
    )
  }



  /* PHONE QR MODE */

  if(mode === "phone"){

    return(

      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">

        <button
        onClick={()=>setMode("home")}
        className="self-start bg-gray-700 px-4 py-2 rounded mb-6">
          Back
        </button>

        <h1 className="text-3xl font-bold mb-4">
          Capture Using Phone
        </h1>

        <QRScanner/>

        <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl mt-10">

          <div className="bg-gray-800 rounded-xl p-4">

            <h2 className="text-xl mb-3">Original</h2>

            {original ? (
              <img src={original} className="rounded-lg w-full"/>
            ) : (
              <p className="text-gray-500">Waiting for image...</p>
            )}

          </div>

          <div className="bg-gray-800 rounded-xl p-4">

            <h2 className="text-xl mb-3">Enhanced</h2>

            {enhanced ? (
              <img src={enhanced} className="rounded-lg w-full"/>
            ) : (
              <p className="text-gray-500">Processing...</p>
            )}

          </div>

        </div>

      </div>

    )

  }

}