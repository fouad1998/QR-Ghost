import { Button, Grid } from '@mui/material'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthCtx } from '../provider/Auth'

const items = [
  {
    title: 'Students',
    link: '/students',
    allowed: ['admin', 'restaurant', 'library'],
  },
  { title: 'Libraries', link: '/libraries', allowed: ['admin'] },
  { title: 'Restaurants', link: '/restaurants', allowed: ['admin'] },
  { title: 'Books', link: '/books', allowed: ['library'] },
  { title: 'Emprunter', link: '/emprunter', allowed: ['library'] },
  { title: 'Meals', link: '/meals', allowed: ['restaurant'] },
  {
    title: 'QR Analysor',
    link: '/qr',
    allowed: ['admin', 'restaurant', 'library', 'student'],
  },
]

const Menu = () => {
  const auth = useContext(AuthCtx)

  return (
    <Grid padding="0px 40px" container>
      {items.map(
        (item) =>
          item.allowed.includes(auth.role) && (
            <Grid key={item.link} item>
              <Link passHref href={item.link}>
                <Button
                  variant="text"
                  style={{ color: 'white', fontWeight: 'bold' }}
                  size="small"
                >
                  {item.title}
                </Button>
              </Link>
            </Grid>
          )
      )}
    </Grid>
  )
}

export default Menu
