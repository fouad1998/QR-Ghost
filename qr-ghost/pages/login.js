import {
  Alert,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material"
import { useContext, useState } from "react"
import { AuthCtx } from "../app/provider/Auth"

const Title = styled(Typography)({
  fontSize: 50,
  fontWeight: "bold",
  marginBottom: 20,
})

const Login = () => {
  const auth = useContext(AuthCtx)
  const [cred, setCred] = useState({ username: "", password: "" })
  const [error, setError] = useState(void 0)
  const [loading, setLoading] = useState(false)

  function onLogin() {
    setLoading(true)
    setError(void 0)
    fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify({ ...cred }),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }

        res.json().then(({ error }) => setError(error))
      })
      .then((obj) => {
        if (obj) {
          const { jwt } = obj
          auth.onAuth(jwt)
        }
      })
      .catch((error) => {
        console.error(error)
        setError("Internet connection issue, please check your internet")
      })
      .finally(() => setLoading(false))
  }

  return (
    <Grid justifyContent="center" alignItems="center" height="100vh" container>
      <Grid
        flex="0 1 300px"
        justifyContent="flex-end"
        rowGap={1}
        item
        container
      >
        <Grid xs={12} item>
          <Title align="center" variant="h1" color="primary">
            Login
          </Title>
        </Grid>
        {error && (
          <Grid xs={12} item>
            <Alert
              title="Login error"
              color="error"
              severity="error"
              onClose={() => setError(void 0)}
            >
              {error}
            </Alert>
          </Grid>
        )}
        <Grid xs={12} item>
          <TextField
            label="username or email"
            value={cred.username}
            size="small"
            name="username"
            disabled={loading}
            onChange={(e) =>
              setCred((state) => ({ ...state, username: e.target.value }))
            }
            fullWidth
          />
        </Grid>
        <Grid xs={12} item>
          <TextField
            label="password"
            type="password"
            name="password"
            value={cred.password}
            size="small"
            disabled={loading}
            onChange={(e) =>
              setCred((state) => ({ ...state, password: e.target.value }))
            }
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button
            disabled={loading}
            size="small"
            variant="contained"
            onClick={onLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

Login.getInitialProps = async (ctx) => {
  return {}
}

export default Login
