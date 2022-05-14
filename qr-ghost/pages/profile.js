import { Avatar, Grid } from "@mui/material"
import { useContext } from "react"
import AddEntity from "../app/addEntity"
import Page from "../app/page"
import { AuthCtx } from "../app/provider/Auth"

const items = [
  { type: "text", id: "username", label: "Username" },
  { type: "text", id: "email", label: "Email" },
  { type: "text", id: "firstname", label: "Firstname" },
  { type: "text", id: "lastname", label: "Lastname" },
  {
    type: "file",
    id: "profile",
    label: "Profile picture",
  },
]

const Profile = () => {
  const auth = useContext(AuthCtx)
  return (
    <Page title="Profile">
      <Grid justifyContent="center" rowGap={2} container>
        <Grid item>
          <Avatar
            src={"http://localhost:3000/" + auth.picture}
            style={{ height: 200, width: 200 }}
          />
        </Grid>
        <Grid item xs={12}>
          <AddEntity
            items={items}
            value={auth}
            onDone={(d) => auth.onUpdateAuth(d)}
            endpoint={"http://localhost:3000/me"}
            buttonText="Save"
          />
        </Grid>
      </Grid>
    </Page>
  )
}

Profile.getInitialProps = async (ctx) => {
  return {}
}

export default Profile
