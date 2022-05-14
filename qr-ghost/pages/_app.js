import { SnackbarProvider } from "notistack"
import ErrorBoundary from "../app/ErrorBoundery"
import AuthProvider from "../app/provider/Auth"
import { configure } from "../app/useFetch/configuration"
import "../styles/globals.css"

configure((configure) => {
  configure.baseUrl = "http://localhost:3000"
  configure.authentificationHeader = () => ({
    authorization: window.localStorage.getItem("id-token"),
  })
  return configure
})

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SnackbarProvider maxSnack={5}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default MyApp
