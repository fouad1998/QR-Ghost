import { qrCodeGen } from "./print";

export async function downloadQR(text) {
   const url = await qrCodeGen(text)
   let downloadLink = document.createElement("a")
   downloadLink.href = url
   downloadLink.download = "qr.png"
   document.body.appendChild(downloadLink)
   downloadLink.click()
   document.body.removeChild(downloadLink)
}