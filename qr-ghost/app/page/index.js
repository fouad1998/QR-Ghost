import { Grid, styled, Typography } from '@mui/material'
import Head from 'next/head'
import Header from '../header'

const Title = styled(Typography)({
  fontSize: 24,
  fontWeight: 'bold',
  margin: '10px 0px',
})

const Page = (props) => {
  const { title, actions, children } = props

  return (
    <Grid container>
      <Head>
        <title>{title ? title + ' | QR Ghost' : 'QR Ghost'}</title>
      </Head>
      <Grid xs={12} item>
        <Header />
      </Grid>
      <Grid xs={12} item>
        <Grid padding={5} container>
          <Grid
            xs={12}
            justifyContent="space-between"
            alignItems="center"
            wrap="nowrap"
            item
            container
          >
            <Grid item>
              <Title color="primary" variant="h1">
                {title}
              </Title>
            </Grid>
            {actions && <Grid item>{actions}</Grid>}
          </Grid>
          <Grid xs={12} item>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Page
