import { useEffect, useState } from "react"

export default function Home() {

  const [original, setOriginal] = useState(null)
  const [enhanced, setEnhanced] = useState(null)

  useEffect(() => {

    const interval = setInterval(() => {

      fetch("https://image-deblur-app.onrender.com/original")
        .then(res => {
          if(res.headers.get("content-type") === "image/jpeg"){
            return res.blob()
          }
        })
        .then(blob => {
          if(blob){
            const url = URL.createObjectURL(blob)
            setOriginal(url)
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
            const url = URL.createObjectURL(blob)
            setEnhanced(url)
          }
        })

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  return (

    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold mb-6">
        AI Image Dehazing
      </h1>

      <p className="text-gray-400 mb-10">
        Capture image from phone and view results here
      </p>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">

        <div className="bg-gray-800 rounded-xl p-4">
          <h2 className="text-xl mb-3">Original</h2>

          {original ? (
            <img
              src={original}
              className="rounded-lg w-full"
            />
          ) : (
            <p className="text-gray-500">Waiting for image...</p>
          )}

        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <h2 className="text-xl mb-3">Enhanced</h2>

          {enhanced ? (
            <img
              src={enhanced}
              className="rounded-lg w-full"
            />
          ) : (
            <p className="text-gray-500">Processing...</p>
          )}

        </div>

      </div>

    </div>
  )
}