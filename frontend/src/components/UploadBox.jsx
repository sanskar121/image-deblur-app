import { useState } from "react"
import axios from "axios"

export default function UploadBox() {

  const [original, setOriginal] = useState(null)
  const [enhanced, setEnhanced] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e) => {

    const file = e.target.files[0]
    if(!file) return

    setOriginal(URL.createObjectURL(file))

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

    const res = await axios.post(
      "https://image-deblur-app.onrender.com/process",
      formData,
      { responseType: "blob" }
    )

    const imageURL = URL.createObjectURL(res.data)
    setEnhanced(imageURL)

    setLoading(false)

  }

  return (

    <div className="flex flex-col items-center gap-6">

      <div className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center w-[400px]">

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        <p className="text-gray-400 mt-4">
          Upload your hazy image
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-gray-800 p-4 rounded-xl">

          <h3 className="mb-3">Original</h3>

          {original && (
            <img src={original} className="rounded-lg"/>
          )}

        </div>

        <div className="bg-gray-800 p-4 rounded-xl">

          <h3 className="mb-3">Enhanced</h3>

          {loading && <p>Processing...</p>}

          {enhanced && (
            <img src={enhanced} className="rounded-lg"/>
          )}

        </div>

      </div>

    </div>
  )
}