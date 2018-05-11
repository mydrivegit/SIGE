import User from '../models/user'
import bcrypt from 'bcryptjs'

let usersGetAll = (req, res, next) => {
  User.find().exec().then((docs) => {
    res.status(200).send({
      success: true,
      content: docs
    })
  }).catch((err) => {
    res.status(500).send(err.errmsg)
  })
}

let usersGetProfile = (req, res, next) => {
  const userId = req.userData.userId
  User.find({ _id: userId }).exec().then((doc) => {
    if (doc.length >= 1) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        content: doc
      })
    } else {
      res.status(204).send({
        message: 'Data not found'
      })
    }
  }).catch(err => {
    res.status(500).send({
      error: err
    })
  })
}

let usersGetAllParamsid = (req, res, next) => {
  const id = req.params.id
  User.findById(id).exec().then((result) => {
    if (result) {
      res.status(201).send({
        message: 'Here is your details for the requested ID',
        result: result
      })
    } else {
      res.status(204).send({
        message: 'User not found'
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: 'User not found',
      error: err.name
    })
  })
}

let usersPatchUserdetails = (req, res, next) => {
  const userId = req.userData.userId
  const updateOps = {}
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  User.update({ _id: userId }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(200).send({
        message: docs
      })
    })
    .catch((err) => {
      res.status(500).send(err.errmsg)
    })
}

let usersPatchdetailsId = (req, res, next) => {
  const userId = req.params.id
  const updateOps = {}
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
  }
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key]
  }
  User.update({ _id: userId }, { $set: updateOps })
    .exec()
    .then((docs) => {
      res.status(200).send({
        message: docs
      })
    })
    .catch((err) => {
      res.status(500).send(err.errmsg)
    })
}

let usersDelete = (req, res, next) => {
  const userId = req.userData.userId
  User.remove({ _id: userId }).exec().then((docs) => {
    res.status(200).send({
      message: docs
    })
  }).catch((err) => {
    res.status(500).send({
      message: err.message
    })
  })
}

let usersDeleteById = (req, res, next) => {
  const userId = req.params.id
  User.remove({ _id: userId }).exec().then((docs) => {
    res.status(200).send({
      message: docs
    })
  }).catch((err) => {
    res.status(500).send({
      message: err.message
    })
  })
}

export default { usersGetAll, usersGetProfile, usersPatchdetailsId, usersDeleteById, usersGetAllParamsid, usersPatchUserdetails, usersDelete }
