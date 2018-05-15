import mongoose from 'mongoose'

let MemberSchema = new mongoose.Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  mobileNo: {
    type: String
  },
  telephone: {
    type: String
  },
  status: {
    type: Boolean
  },
  class: {
    type: String
  },
  inCharge: {
    type: String
  },
  dob: {
    type: Date
  },
  gender: {
    type: String
  },
  address: {
    type: String
  },
  town: {
    type: String
  },
  cp: {
    type: String
  },
  roleStudent: {
    type: Boolean,
    default: false
  },
  roleProf: {
    type: Boolean,
    default: false
  },
  role: {
    type: String
  },
  page: {
    type: String
  },
  roleInCharge: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
})

export default mongoose.model('Member', MemberSchema)
