import Classes from '../models/class'
import moment from 'moment'

let classPost = (req, res, next) => {
  let classes = new Classes({
    code: req.body.code,
    year: req.body.year,
    semester: req.body.semester,
    label: req.body.label,
    level: req.body.level,
    status: req.body.status
  })
  classes.save()
    .then(res.status(201)
      .send({
        success: true,
        message: 'Class created succesfully'
      }))
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

let classGetAll = (req, res, next) => {
  Classes.find().exec().then((docs) => {
    res.status(200).send({
      message: 'Here is the list of Classes and their details',
      success: true,
      docs
    })
  }).catch((err) => {
    res.status(500).send(err.message)
  })
}

let classGetAllParamsid = (req, res, next) => {
  const id = req.params.id
  Classes.findById(id).exec().then((docs) => {
    if (docs) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        docs
      })
    } else {
      res.status(204).send({
        message: 'Class not found'
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: 'Class not found',
      error: err.name
    })
  })
}

let classPatchdetailsId = (req, res, next) => {
  const userId = req.params.id
  const updateOps = {}
  if (req.body.dob) {
    req.body.dob = moment(moment(req.body.dob, 'DD/MM/YYYY').toDate()).add(1, 'hours')
  }
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  Classes.update({ _id: userId }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(201).send({
        message: 'Class details are altered succesfully',
        docs
      })
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

export default { classPost, classGetAll, classPatchdetailsId, classGetAllParamsid }
