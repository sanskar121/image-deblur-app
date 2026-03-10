import { useState } from "react"
import axios from "axios"

export default function UploadBox(){

const [original,setOriginal] = useState(null)
const [enhanced,setEnhanced] = useState(null)
const [loading,setLoading] = useState(false)

const handleUpload = async (e)=>{

const file = e.target.files[0]

if(!file) return

// show preview
setOriginal(URL.createObjectURL(file))

const formData = new FormData()
formData.append("file",file)

setLoading(true)

try{

const res = await axios.post(
"https://image-deblur-app.onrender.com/process",
formData,
{
responseType:"blob"
}
)

const enhancedURL = URL.createObjectURL(res.data)

setEnhanced(enhancedURL)

}catch(error){

console.error("Upload failed:",error)

}

setLoading(false)

}

return(

<div className="flex flex-col items-center gap-10">

{/* Upload Box */}

<div className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center w-[420px]">

<input
type="file"
accept="image/*"
onChange={handleUpload}
/>

<p className="text-gray-400 mt-4">
Upload your hazy image
</p>

</div>


{/* Results */}

<div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">

{/* Original */}

<div className="bg-gray-800 rounded-xl p-4">

<h2 className="text-xl mb-3">
Original
</h2>

{original ? (

<img
src={original}
className="rounded-lg w-full"
/>

):(

<p className="text-gray-500">
Upload image to preview
</p>

)}

</div>


{/* Enhanced */}

<div className="bg-gray-800 rounded-xl p-4">

<h2 className="text-xl mb-3">
Enhanced
</h2>

{loading && (

<p className="text-gray-400">
Enhancing image...
</p>

)}

{enhanced && (

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

)}

</div>

</div>

</div>

)

}