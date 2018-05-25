import express from 'express'
import verifyToken from '../middleware/auth-middleware'
import classController from '../controller/class'

let classes = express.Router()

classes.use(verifyToken)
  .post('/', classController.classPost)
  .get('/', classController.classGetAll)
  .get('/:id', classController.classGetAllParamsid)
  .patch('/update/:id', classController.classPatchdetailsId)
  .patch('/updatestudent/:id', classController.classPatchStudentId)
  .patch('/pullstudent/:id', classController.classPullStudentId)

export default classes
