import { Button } from '@mui/material'
import { useContext } from 'react'
import { downloadQR } from '../app/downloadQR'
import Page from '../app/page'
import { AuthCtx } from '../app/provider/Auth'
import styles from '../styles/Home.module.css'

export default function Home() {
  const { id } = useContext(AuthCtx)

  return (
    <Page>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a>QR-Ghost!</a>
          </h1>

          <p className={styles.description}>Start discovering our services</p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Budget</h2>
              <p>Get your budget by clicking on generate button.</p>
              <Button
                variant="contained"
                sx={{ my: 1 }}
                fullWidth
                onClick={() => downloadQR(JSON.stringify({ userID: id }))}
              >
                Generate
              </Button>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>Created by Sami @ Aymen</footer>
      </div>
    </Page>
  )
}
