import { Router } from 'express'
import { addUser } from '../middleware/addUser'
import { removeUser } from '../middleware/removeUser'
import { users } from '../middleware/users'
import multer from '../multer'

export const restaurants = Router()

restaurants.get(
  '/restaurants',
  users('restaurant', 'restaurants', ['admin', 'restaurant'])
)

restaurants.post(
  '/restaurants/add',
  multer.single('profile'),
  addUser('restaurant', ['admin'])
)

restaurants.post('/restaurants/remove', removeUser('restaurant', ['admin']))
