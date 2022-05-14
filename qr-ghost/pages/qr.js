import { Button, Grid } from "@mui/material"
import Page from "../app/page"
import { useState } from "react"
import UserPlateform from "../app/UserPlateform"
import Book from "../app/Book"
import Emprunter from "../app/Emprunter"
import Scan from "../app/Scan"



const QR = () => {
  const [data, setData] = useState(void 0)

  function onResult(result) {
    if (!!result && result) {
      try {
        setData(JSON.parse(result))
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Page title="Analysor">
      <Grid justifyContent={"center"} container>
        {!data && (
          <Grid item>
            <Scan onScan={onResult} />
          </Grid>
        )}

        {data && (
          <Grid
            flex="0 1 500px"
            justifyContent="flex-end"
            rowGap={2}
            item
            container
          >
            {"userID" in data && (
              <Grid xs={12} item>
                <UserPlateform id={data.userID} />
              </Grid>
            )}
            {"bookID" in data && (
              <Grid xs={12} item>
                <Book id={data.bookID} />
              </Grid>
            )}
            {"emprunterID" in data && (
              <Grid xs={12} item>
                <Emprunter id={data.emprunterID} />
              </Grid>
            )}
            <Grid item>
              <Button size="small" onClick={() => setData(void 0)}>
                Scan again
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Page>
  )
}

QR.getInitialProps = async (ctx) => {
  return {}
}

export default QR
