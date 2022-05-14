import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import Loading from '../../app/Loading'
import Page from '../../app/page'
import Scan from '../../app/Scan'
import { useFetch } from '../../app/useFetch/useFetch'

const AddEmprunter = () => {
  const [select, setSelect] = useState({ student: '', book: '' })
  const [error, setError] = useState(void 0)
  const [success, setSuccess] = useState(void 0)
  const [loading, setLoading] = useState(false)
  const [qr, setQr] = useState({ student: false, book: false })
  const [{ books, students, emprunters }, isLoading] = useFetch((fetch) => ({
    books: fetch('/books'),
    students: fetch('/students'),
    emprunters: fetch('/emprunters'),
  }))

  function onAdd() {
    const body = new FormData()
    setError(void 0)
    setSuccess(void 0)
    Object.keys(select).forEach((e) => body.append(e, select[e]))
    setLoading(true)
    fetch('http://localhost:3000/emprunter/add', {
      method: 'POST',
      body,
      headers: {
        authorization: window.localStorage.getItem('id-token'),
      },
    })
      .then((res) => {
        if (res.ok) {
          setSelect({ student: '', book: '' })
          return
        }

        res.json().then(({ error }) => setError(error))
      })
      .then(() => setSuccess('Operation done successfuly'))
      .catch(() =>
        setError('Internet connection error, please check your internet')
      )
      .finally(() => setLoading(false))
  }

  return (
    <Page title="Emprunter">
      {isLoading && <Loading />}
      {!isLoading && students && books && emprunters && (
        <Grid rowGap={2} justifyContent="center" container>
          {(error || success) && (
            <Grid xs={12} item>
              <Alert
                title={error ? 'Error' : 'Success'}
                color={error ? 'error' : 'success'}
                severity={error ? 'error' : 'success'}
                onClose={() => {
                  setError(void 0)
                  setSuccess(void 0)
                }}
              >
                {error || success}
              </Alert>
            </Grid>
          )}
          <Grid xs={12} gap={2} wrap="nowrap" item container>
            <Grid
              flex="1 1 auto"
              justifyContent="center"
              rowGap={2}
              item
              container
            >
              <Grid xs={12} item>
                <Typography>Student</Typography>
              </Grid>
              <Grid xs={12} item>
                <FormControl fullWidth>
                  <InputLabel id="student">Student</InputLabel>
                  <Select
                    value={select.student}
                    label="Student"
                    size="small"
                    labelId="student"
                    disabled={loading}
                    onChange={(e) =>
                      setSelect((state) => ({
                        ...state,
                        student: e.target.value,
                      }))
                    }
                    fullWidth
                  >
                    {(students.students || []).map((e) => (
                      <MenuItem value={e.id} key={e.id}>
                        {e.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {!qr.student && (
                <Grid item>
                  <Button
                    onClick={() =>
                      setQr((state) => ({ ...state, student: true }))
                    }
                  >
                    Scan QR
                  </Button>
                </Grid>
              )}
              {qr.student && !loading && (
                <Grid item>
                  <Scan
                    onScan={(result) => {
                      if (loading) return
                      const s = JSON.parse(result)
                      if (s === null) {
                        return
                      }

                      if (!'userID' in s) {
                        return
                      }

                      if (!students.students.find((e) => e.id === s.userID)) {
                        return
                      }

                      setQr((state) => ({ ...state, student: false }))
                      setSelect((state) => ({ ...state, student: s.userID }))
                    }}
                  />
                </Grid>
              )}
            </Grid>

            <Grid
              flex="1 1 auto"
              justifyContent="center"
              rowGap={2}
              item
              container
            >
              <Grid xs={12} item>
                <Typography>Book</Typography>
              </Grid>
              <Grid xs={12} item>
                <FormControl fullWidth>
                  <InputLabel id="student">Book</InputLabel>
                  <Select
                    value={select.book}
                    label="Student"
                    labelId="student"
                    size="small"
                    disabled={loading}
                    onChange={(e) =>
                      setSelect((state) => ({ ...state, book: e.target.value }))
                    }
                    fullWidth
                  >
                    {(books.books || []).map((e) => (
                      <MenuItem
                        value={e.id}
                        key={e.id}
                        disabled={
                          !!emprunters.emprunters.find(
                            (a) => a.book_id === e.id
                          )
                        }
                      >
                        {e.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {!qr.book && (
                <Grid item>
                  <Button
                    onClick={() => setQr((state) => ({ ...state, book: true }))}
                  >
                    Scan QR
                  </Button>
                </Grid>
              )}
              {qr.book && !loading && (
                <Grid item>
                  <Scan
                    onScan={(result) => {
                      if (loading) return

                      const s = JSON.parse(result)
                      if (s === null) {
                        return
                      }

                      if (!'bookID' in s) {
                        return
                      }

                      if (!books.books.find((e) => e.id === s.bookID)) {
                        return
                      }

                      setQr((state) => ({ ...state, book: false }))
                      const found = emprunters.emprunters.find(
                        (a) => a.book_id === s.bookID
                      )
                      if (found) {
                        return
                      }

                      setSelect((state) => ({ ...state, book: s.bookID }))
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={onAdd}>
              Add
            </Button>
          </Grid>
        </Grid>
      )}
      {!isLoading && !(students && books && emprunters) && (
        <Typography align="center" color="error">
          Error while loading
        </Typography>
      )}
    </Page>
  )
}

export default AddEmprunter
