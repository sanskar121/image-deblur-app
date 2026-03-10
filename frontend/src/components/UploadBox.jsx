import { useState } from "react"
import axios from "axios"

export default function UploadBox({setOriginal,setResult,setLoading}){

const uploadImage = async(e)=>{

const file = e.target.files[0]

setOriginal(URL.createObjectURL(file))

const formData = new FormData()
formData.append("file",file)

setLoading(true)

const res = await axios.post(
"http://127.0.0.1:8000/process",
formData
)

setResult(res.data.image)
setLoading(false)

}

return(

<div className="flex flex-col items-center text-center">

  <div className="border-2 border-dashed border-gray-600 hover:border-blue-500 transition-all p-14 rounded-2xl w-full max-w-xl cursor-pointer">

    <input
      type="file"
      accept="image/*"
      onChange={uploadImage}
      className="mb-4"
    />

    <div className="text-4xl mb-3">
      ☁️
    </div>

    <p className="text-lg font-semibold">
      Upload your image
    </p>

    <p className="text-gray-400 text-sm mt-2">
      Drag & drop or click to browse
    </p>

  </div>

</div>

)

}