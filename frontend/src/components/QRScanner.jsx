import { QRCodeCanvas } from "qrcode.react"

export default function QRScanner(){

const phoneURL = "http://192.168.1.6:5173/phone"

return(

<div className="text-center mt-10">

<h3 className="text-lg mb-4">
Scan with phone to capture photo
</h3>

<div className="flex justify-center">

<QRCodeCanvas value={phoneURL} size={180} />

</div>

<p className="text-gray-400 mt-3 text-sm">
Open phone camera → scan QR → capture photo
</p>

</div>

)

}

