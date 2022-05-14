import {
  Alert,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"

const AddEntity = (props) => {
  const { items, endpoint, redirection, value, buttonText, onDone } = props
  const [state, setState] = useState({
    ...items.reduce((pr, c) => ({ ...pr, [c.id]: "" }), {}),
    ...Object.keys(value || {}).reduce(
      (prev, c) =>
        typeof value[c] === "function" ? prev : { ...prev, [c]: value[c] },
      {}
    ),
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(void 0)
  const [success, setSuccess] = useState(void 0)
  const router = useRouter()

  function onAdd() {
    const body = new FormData()
    setError(void 0)
    setSuccess(void 0)
    Object.keys(state).forEach((e) => body.append(e, state[e]))
    setLoading(true)
    fetch(endpoint, {
      method: "POST",
      body,
      headers: {
        authorization: window.localStorage.getItem("id-token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          if (onDone) {
            res.json().then(onDone)
            return
          }

          router.push(redirection)
          return
        }

        res.json().then(({ error }) => setError(error))
      })
      .then(() => setSuccess("Operation done successfuly"))
      .catch(() =>
        setError("Internet connection error, please check your internet")
      )
      .finally(() => setLoading(false))
  }

  return (
    <Grid justifyContent={"center"} container>
      <Grid
        flex="0 1 500px"
        rowGap={2}
        justifyContent="flex-end"
        item
        container
      >
        {(error || success) && (
          <Grid xs={12} item>
            <Alert
              title={error ? "Error" : "Success"}
              color={error ? "error" : "success"}
              severity={error ? "error" : "success"}
              onClose={() => {
                setError(void 0)
                setSuccess(void 0)
              }}
            >
              {error || success}
            </Alert>
          </Grid>
        )}
        {items.map((item) => {
          if (item.type === "text" || item.type === "password") {
            return (
              <Grid xs={12} key={item.id} item>
                <TextField
                  name={item.id}
                  value={state[item.id]}
                  type={item.type}
                  label={item.label}
                  size="small"
                  disabled={loading}
                  onChange={(e) =>
                    setState((state) => ({
                      ...state,
                      [item.id]: e.target.value,
                    }))
                  }
                  fullWidth
                />
              </Grid>
            )
          }

          if (item.type === "select") {
            return (
              <Grid xs={12} key={item.id} item>
                <FormControl fullWidth>
                  <InputLabel id={item.id}>{item.label}</InputLabel>
                  <Select
                    value={state[item.id]}
                    size="small"
                    labelId={item.id}
                    label={item.label}
                    MenuProps={{ style: { maxHeight: 300 } }}
                    disabled={loading}
                    onChange={(e) =>
                      setState((state) => ({
                        ...state,
                        [item.id]: e.target.value,
                      }))
                    }
                    fullWidth
                  >
                    {item.options.map(({ val, label }) => (
                      <MenuItem key={val} value={val}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )
          }

          if (item.type === "file") {
            return (
              <Grid xs={12} key={item.id} item>
                <FormControl fullWidth>
                  <label htmlFor={item.id + "-file"}>
                    <Button
                      disabled={loading}
                      variant="raised"
                      component="span"
                    >
                      {item.label}
                    </Button>
                  </label>
                  <input
                    id={item.id + "-file"}
                    disabled={loading}
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setState((state) => ({
                        ...state,
                        [item.id]: (e.target.files || [])[0],
                      }))
                    }
                    type="file"
                  />
                </FormControl>
              </Grid>
            )
          }
        })}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={onAdd}
          >
            {buttonText || "Add"}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddEntity
