import { Grid, TextField, Avatar } from "@mui/material"
import Loading from "../Loading"
import { useFetch } from "../useFetch/useFetch"

const Book = (props) => {
  const { id } = props
  const [{ book }, isLoading] = useFetch((fetch) => ({
    book: fetch("/book", { queryParams: { id } }),
  }))

  return (
    <Grid justifyContent={"center"} container>
      {isLoading && <Loading />}
      {!isLoading && book && (
        <Grid xs={12} justifyContent="center" rowGap={2} item container>
          <Grid item>
            <Avatar
              variant="rounded"
              src={"http://localhost:3000/" + book.cover}
              style={{ height: 200, width: 200 }}
            />
          </Grid>

          <Grid xs={12} item>
            <TextField
              name={"title"}
              label="title"
              value={book["title"]}
              size="small"
              disabled
              fullWidth
            />
          </Grid>
          <Grid xs={12} item>
            <TextField
              name={"description"}
              label="description"
              value={book["description"]}
              size="small"
              multiline
              disabled
              fullWidth
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Book
