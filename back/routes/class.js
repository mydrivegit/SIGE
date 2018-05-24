import express from 'express'
import verifyToken from '../middleware/auth-middleware'
import classController from '../controller/class'

let classes = express.Router()

classes.use(verifyToken)
  .post('/', classController.classPost)
  .get('/', classController.classGetAll)
  .get('/:id', classController.classGetAllParamsid)
  // .get('/member/:id', classController.classGetMember)
  .patch('/update/:id', classController.classPatchdetailsId)

export default classes
