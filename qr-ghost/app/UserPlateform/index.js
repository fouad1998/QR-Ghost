import { Grid, TextField, Avatar } from "@mui/material"
import Loading from "../Loading"
import { useFetch } from "../useFetch/useFetch"

const UserPlateform = (props) => {
  const { id } = props
  const [{ user }, isLoading] = useFetch((fetch) => ({
    user: fetch("/user", { queryParams: { id } }),
  }))

  return (
    <Grid justifyContent={"center"} container>
      {isLoading && <Loading />}
      {!isLoading && user && (
        <Grid xs={12} justifyContent="center" rowGap={2} item container>
          <Grid item>
            <Avatar
              src={"http://localhost:3000/" + user.picture}
              style={{ height: 200, width: 200 }}
            />
          </Grid>
          {Object.keys(user).map((key) => {
            if (key === "picture" || typeof user[key] !== "string") return null


            return (
              <Grid xs={12} key={key} item>
                <TextField
                  name={key}
                  value={user[key]}
                  size="small"
                  disabled
                  fullWidth
                />
              </Grid>
            )
          })}
        </Grid>
      )}
    </Grid>
  )
}

export default UserPlateform
