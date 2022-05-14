import dynamic from "next/dynamic"
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false })

const Scan = (props) => {
  const { onScan } = props
  try {
    return (
      <QrReader
        style={{ height: 300, width: 300 }}
        facingMode="user"
        resolution={300}
        showViewFinder
        onError={console.error}
        onScan={onScan}
      />
    )
  } catch {
    return null
  }
}

export default Scan
