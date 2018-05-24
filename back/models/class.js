import mongoose from 'mongoose'

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let classStudentSchema = new Schema({
  studentId: { type: ObjectId, ref: 'Member' }
}, { _id: false })

let ClassesSchema = new Schema({
  code: {
    type: String
  },
  year: String,
  semester: Number,
  label: String,
  level: String,
  status: Boolean,
  studentIds: [classStudentSchema]
},
{
  timestamps: true
})

export default mongoose.model('Classes', ClassesSchema)
