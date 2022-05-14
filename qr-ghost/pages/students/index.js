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
import { useContext, useEffect, useState } from 'react'
import Loading from '../../app/Loading'
import Page from '../../app/page'
import EnhancedTable from '../../app/table'
import { useFetch } from '../../app/useFetch/useFetch'
import { print } from '../../app/print'
import { downloadQR } from '../../app/downloadQR'
import QRCode from '../../app/QRCode'
import { AuthCtx } from '../../app/provider/Auth'

const Students = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(void 0)
  const auth = useContext(AuthCtx)
  const [{ students }, isLoading] = useFetch((fetch) => ({
    students: fetch('/students'),
  }))

  const onToggleOpen = function (o) {
    setSelected(o)
    setOpen((state) => !state)
  }

  function onDelete(id) {
    return fetch('http://localhost:3000/students/remove', {
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
      if (Array.isArray((students || {}).students)) {
        setData(students.students)
      }
    },
    [students]
  )

  return (
    <Page
      title="Students"
      actions={
        auth.role === 'admin' && (
          <Link href="/students/add">
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        )
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
                        print(JSON.stringify({ emprunterID: e.id }))
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

Students.getInitialProps = async (ctx) => {
  return {}
}

export default Students
