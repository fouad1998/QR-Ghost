import { Router } from 'express'
import { addUser } from '../middleware/addUser'
import { removeUser } from '../middleware/removeUser'
import { users } from '../middleware/users'
import multer from '../multer'

export const libraries = Router()

libraries.get(
  '/libraries',
  users('library', 'libraries', ['admin', 'restaurant'])
)

libraries.post(
  '/libraries/add',
  multer.single('profile'),
  addUser('library', ['admin'])
)

libraries.post('/libraries/remove', removeUser('library', ['admin']))
