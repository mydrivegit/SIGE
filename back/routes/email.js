import express from 'express'
// import verifyToken from '../middleware/auth-middleware'
import emailController from '../controller/email'

let email = express.Router()

email
  .post('/', emailController.emailGet)

export default email
