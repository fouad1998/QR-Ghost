import { Grid } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useRef, useState } from 'react'
import Page from '../../app/page'
import Loading from '../../app/Loading'
import dynamic from 'next/dynamic'
const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false })

const Resolve = () => {
  const loadingRef = useRef(false)
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  function onDelete(id) {
    if (loadingRef.current) return
    setLoading(true)
    loadingRef.current = true
    return fetch('http://localhost:3000/emprunter/remove', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('id-token'),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }

        return res.json().then(({ error }) => {
          throw new Error(error)
        })
      })
      .finally(() => {
        setLoading(false)
        setTimeout(() => (loadingRef.current = false), 10000)
      })
  }

  return (
    <Page title="Emprunter">
      <Grid justifyContent={'center'} container>
        <Grid item>
          <QrReader
            style={{ height: 300, width: 300 }}
            facingMode="user"
            resolution={300}
            showViewFinder
            onError={console.error}
            onScan={(r) => {
              const d = JSON.parse(r)
              if (typeof d !== 'object' || d === null || !'emprunterID' in d) {
                return
              }

              const a = onDelete(d.emprunterID)
              if (!a) return

              a.then(() => {
                enqueueSnackbar('Was resolved successfuly', {
                  variant: 'success',
                })
              }).catch((e) => {
                enqueueSnackbar(e.message, { variant: 'error' })
              })
            }}
          />
        </Grid>
        {loading && (
          <Grid xs={12} item>
            <Loading />
          </Grid>
        )}
      </Grid>
    </Page>
  )
}

Resolve.getInitialProps = async (ctx) => {
  return {}
}

export default React.memo(Resolve)
