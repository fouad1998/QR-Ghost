import { Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import Loading from '../Loading'
import Scan from '../Scan'
import { useFetch } from '../useFetch/useFetch'

const MealScanner = (props) => {
  const { onCheck } = props
  const [{ students, libraries, restaurants }, isLoading] = useFetch(
    (fetch) => ({
      students: fetch('/students'),
      libraries: fetch('/libraries'),
      restaurants: fetch('/restaurants'),
    })
  )
  const { enqueueSnackbar } = useSnackbar()

  function a(r) {
    try {
      if (!r) {
        return
      }

      const a = JSON.parse(r)
      if (!'userID' in a) {
        return
      }

      const { userID } = a
      const z = onCheck(userID)
      if (z)
        z.then(() => {
          const s = students?.students?.find((e) => e.id === userID)
          const l = libraries?.libraries?.find((e) => e.id === userID)
          const r = restaurants?.restaurants?.find((e) => e.id === userID)
          enqueueSnackbar(
            `${s ? s.username + ' student' : ''}${
              l ? l.username + ' library' : ''
            }${r ? r.username + 'restaurant' : ''}` + ' checked successfuly'
          )
        }).catch((e) => enqueueSnackbar(e.message, { variant: 'error' }))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Grid container>
      {!isLoading && (
        <Grid item>
          <Scan onScan={a} />
        </Grid>
      )}
      {isLoading && (
        <Grid item>
          <Loading />
        </Grid>
      )}
    </Grid>
  )
}

export default MealScanner
