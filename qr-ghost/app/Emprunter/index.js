import { Grid, TextField, Avatar, AvatarGroup } from "@mui/material"
import Loading from "../Loading"
import { useFetch } from "../useFetch/useFetch"

const Emprunter = (props) => {
  const { id } = props
  const [{ emprunter }, isLoading] = useFetch((fetch) => ({
    emprunter: fetch("/emprunter", { queryParams: { id } }),
  }))
console.log(emprunter)
  return (
    <Grid justifyContent={"center"} container>
      {isLoading && <Loading />}
      {!isLoading && emprunter && (
        <Grid xs={12} justifyContent="center" rowGap={2} item container>
          <Grid item>
            <AvatarGroup>
              <Avatar
                src={"http://localhost:3000/" + emprunter.emprunter.picture}
                style={{ height: 200, width: 200 }}
              />
              <Avatar
                src={"http://localhost:3000/" + emprunter.emprunter.cover}
                style={{ height: 200, width: 200 }}
              />
            </AvatarGroup>
          </Grid>
          {Object.keys(emprunter.emprunter).map((key) => {
            if (
              key === "picture" ||
              key === "cover" ||
              typeof emprunter.emprunter[key] !== "string"
            )
              return null

            return (
              <Grid xs={12} key={key} item>
                <TextField
                  name={key}
                  value={emprunter.emprunter[key]}
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

export default Emprunter
