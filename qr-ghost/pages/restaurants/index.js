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
import QRCode from '../../app/QRCode'
import EnhancedTable from '../../app/table'
import { useFetch } from '../../app/useFetch/useFetch'

const Restaurants = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(void 0)
  const [{ restaurants }, isLoading] = useFetch((fetch) => ({
    restaurants: fetch('/restaurants'),
  }))

  function onDelete(id) {
    return fetch('http://localhost:3000/restaurants/remove', {
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

  const onToggleOpen = function (o) {
    setSelected(o)
    setOpen((state) => !state)
  }

  useEffect(
    function () {
      if (Array.isArray((restaurants || {}).restaurants)) {
        setData(restaurants.restaurants)
      }
    },
    [restaurants]
  )

  return (
    <Page
      title="Restaurants"
      actions={
        <Link href="/restaurants/add">
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
              <QRCode value={JSON.stringify({ userID: selected?.id })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => downloadQR(JSON.stringify({ userID: selected?.id }))}
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
              allowed={['admin']}
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
                        print(JSON.stringify({ userID: e.id }))
                      }}
                    >
                      <Print />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
              headers={[
                {
                  id: 'username',
                  numeric: false,
                  disablePadding: true,
                  label: 'Username',
                },
                {
                  id: 'email',
                  numeric: false,
                  disablePadding: false,
                  label: 'Email',
                },
                {
                  id: 'firstname',
                  numeric: false,
                  disablePadding: false,
                  label: 'Firstname',
                },
                {
                  id: 'lastname',
                  numeric: false,
                  disablePadding: false,
                  label: 'Lastname',
                },
                {
                  id: 'role',
                  numeric: false,
                  disablePadding: false,
                  label: 'role',
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

Restaurants.getInitialProps = async (ctx) => {
  return {}
}

export default Restaurants
