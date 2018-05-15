import Member from '../models/member'
import moment from 'moment'

let memberPost = (req, res, next) => {
  let member = new Member({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    mobileNo: req.body.mobileNo,
    telephone: req.body.telephone,
    status: req.body.status,
    class: req.body.class,
    inCharge: req.body.inCharge,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    town: req.body.town,
    cp: req.body.cp,
    roleStudent: req.body.roleStudent,
    role: req.body.role,
    roleInCharge: req.body.roleInCharge,
    page: req.body.page
  })
  member.save()
    .then(res.status(201)
      .send({
        success: true,
        message: 'Member created succesfully'
      }))
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

let memberGetAll = (req, res, next) => {
  Member.find().exec().then((docs) => {
    console.log(docs)
    res.status(200).send({
      message: 'Here is the list of Members and their details',
      success: true,
      docs
    })
  }).catch((err) => {
    res.status(500).send(err.message)
  })
}

let memberGetAllParamsid = (req, res, next) => {
  const id = req.params.id
  Member.findById(id).exec().then((docs) => {
    if (docs) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        docs
      })
    } else {
      res.status(204).send({
        message: 'Member not found'
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: 'Member not found',
      error: err.name
    })
  })
}

let memberPatchdetailsId = (req, res, next) => {
  const userId = req.params.id
  const updateOps = {}
  if (req.body.dob) {
    req.body.dob = moment(moment(req.body.dob, 'DD/MM/YYYY').toDate()).add(1, 'hours')
  }
  for (const key of Object.keys(req.body)) {
    console.log(req.body.dob)
    updateOps[key] = req.body[key]
  }
  Member.update({ _id: userId }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(201).send({
        message: 'Member details are altered succesfully',
        docs
      })
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
}

export default { memberPost, memberGetAll, memberPatchdetailsId, memberGetAllParamsid }
