import { CircularProgress, Grid } from "@mui/material"

const Loading = () => {
  return (
    <Grid justifyContent={"center"} alignItems="center" padding={20} container>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  )
}

export default Loading
