import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'
import { decode } from 'jsonwebtoken'
import { useRouter } from 'next/router'
import { createContext, Fragment, useEffect, useState } from 'react'

export const AuthCtx = createContext({})

const AuthProvider = (props) => {
  const { children } = props
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState({})
  const [error, setError] = useState(void 0)
  const router = useRouter()

  function onAuth(jwt) {
    window.localStorage.setItem('id-token', jwt)
    setValue(decode(jwt))
  }

  function onLogout() {
    window.localStorage.removeItem('id-token')
    setValue({})
    router.push('/login')
  }

  function onUpdateAuth() {
    const token = window.localStorage.getItem('id-token')
    return fetch('http://localhost:3000/update', {
      headers: { authorization: token },
      method: 'POST',
    })
      .then((res) => {
        if (res.status !== 200) {
          window.localStorage.removeItem('id-token')
          router.push('/login')
          return
        }

        return res.json().then(({ jwt }) => onAuth(jwt))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function verify() {
    const token = window.localStorage.getItem('id-token')
    if (!token) {
      if (router.pathname !== '/login') {
        router.push('/login')
        return
      }

      return
    }

    setError(void 0)
    setLoading(true)
    return fetch('http://localhost:3000/verify', {
      headers: { authorization: token },
      method: 'POST',
    })
      .then((res) => {
        if (res.status !== 200) {
          if (router.pathname !== '/login') {
            router.push('/login')
            return
          }

          return
        }

        setValue(decode(token))
      })
      .catch((error) => {
        console.error(error)
        setError('Internet connection issue, please check your internet')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    verify()
  }, [router.pathname])

  useEffect(() => {
    const { role } = value || {}
    if (router.pathname === '/login') {
      console.log('pushhhnoiiiig')
      switch (role) {
        case 'student':
        case 'admin':
        case 'restaurant':
        case 'library':
          router.push('/')
      }
    }
  }, [value, router.pathname, router])

  return (
    <AuthCtx.Provider value={{ ...value, onAuth, onLogout, onUpdateAuth }}>
      {error && (
        <Alert
          title="internet issue"
          color="error"
          severity="error"
          action={<Button onClick={verify}>Retry</Button>}
        >
          {error}
        </Alert>
      )}
      {!error && (
        <>
          {!loading && children}
          {loading && (
            <Grid
              padding={20}
              justifyContent="center"
              alignItems="center"
              container
            >
              <Grid justifyContent={'center'} rowGap={1} item container>
                <Grid item>
                  <CircularProgress />
                </Grid>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </AuthCtx.Provider>
  )
}

export default AuthProvider
