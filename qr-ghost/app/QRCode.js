import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { qrCodeGen } from "./print"

const QRCode = (props) => {
  const { value } = props
  const [url, setURL] = useState(void 0)
  useEffect(() => {
    qrCodeGen(value).then(setURL)
  }, [value])

  return (
    <Grid justifyContent={"center"} container>
      <Grid item>
        <img src={url} />
      </Grid>
    </Grid>
  )
}

export default QRCode
