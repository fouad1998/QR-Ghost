import QRCode from "qrcode"

export async function qrCodeGen(text) {
  return await QRCode.toDataURL(text)
}
