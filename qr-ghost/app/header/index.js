import { Grid, styled, Typography } from '@mui/material'
import Link from 'next/link'
import Menu from '../menu'
import User from '../user'

const Container = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
}))

const Title = styled(Typography)({
  fontSize: 16,
  fontWeight: 'bold',
  fontStyle: 'oblique',
})

const Header = () => {
  return (
    <Container
      padding={2}
      justifyContent="space-between"
      alignItems="center"
      wrap="nowrap"
      container
    >
      <Grid item alignItems={'center'} container>
        <Grid item>
          <Link passHref={true} href="/">
            <a>
              <Title color="white">QR-Ghost</Title>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Menu />
        </Grid>
      </Grid>
      <Grid item>
        <User />
      </Grid>
    </Container>
  )
}

export default Header
