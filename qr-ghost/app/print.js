import jsPDF from "jspdf"
import qrcode from "qrcode"

export async function qrCodeGen(text) {
  return await qrcode.toDataURL(text)
}

export async function print(text) {
  const src = await qrCodeGen(text)
  const img = new Image()
  img.src = src

  const pdf = new jsPDF()
  pdf.addImage(src, "PNG", 10, 10, 200, 200)
  pdf.save("qr.pdf")
}
