import { Add, Print, QrCode } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { downloadQR } from '../../app/downloadQR'
import Loading from '../../app/Loading'
import Page from '../../app/page'
import { print } from '../../app/print'
import QRCode from '../../app/QRCode'
import EnhancedTable from '../../app/table'
import { useFetch } from '../../app/useFetch/useFetch'

const Books = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(void 0)
  const [{ books }, isLoading] = useFetch((fetch) => ({
    books: fetch('/books'),
  }))

  const onToggleOpen = function (o) {
    setSelected(o)
    setOpen((state) => !state)
  }

  function onDelete(id) {
    return fetch('http://localhost:3000/books/remove', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('id-token'),
      },
    }).then((res) => {
      if (res.ok) {
        setData((state) => state.filter((e) => e.id !== id))
        return res.json()
      }

      res.json().then(({ error }) => {
        throw new Error(error)
      })
    })
  }

  useEffect(
    function () {
      if (Array.isArray((books || {}).books)) {
        setData(books.books)
      }
    },
    [books]
  )

  return (
    <Page
      title="Books"
      actions={
        <Link href="/books/add">
          <IconButton>
            <Add />
          </IconButton>
        </Link>
      }
    >
      <Dialog open={open}>
        <DialogTitle>Student QR Code</DialogTitle>
        <DialogContent>
          <Grid justifyContent={'center'} container>
            <Grid item>
              <QRCode value={JSON.stringify({ bookID: selected?.id })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => downloadQR(JSON.stringify({ bookID: selected?.id }))}
          >
            download
          </Button>
          <Button onClick={() => onToggleOpen()}>done</Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        {isLoading && <Loading />}
        {!isLoading && (
          <Grid xs={12} item>
            <EnhancedTable
              rows={data}
              onDelete={onDelete}
              allowed={['library']}
              actions={(e) => (
                <Grid container>
                  <Grid item>
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation()
                        onToggleOpen(e)
                      }}
                    >
                      <QrCode />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation()
                        print(JSON.stringify({ bookID: e.id }))
                      }}
                    >
                      <Print />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
              headers={[
                {
                  id: 'title',
                  numeric: false,
                  disablePadding: true,
                  label: 'Title',
                },
                {
                  id: 'description',
                  numeric: false,
                  disablePadding: false,
                  label: 'Description',
                },
                {
                  id: 'actions',
                  numeric: false,
                  disablePadding: false,
                  label: 'Actions',
                },
              ]}
            />
          </Grid>
        )}
      </Grid>
    </Page>
  )
}

Books.getInitialProps = async (ctx) => {
  return {}
}

export default Books
