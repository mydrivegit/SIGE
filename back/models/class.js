import mongoose from 'mongoose'

let ClassesSchema = new mongoose.Schema({
  code: {
    type: String
  },
  year: String,
  semester: Number,
  label: String,
  level: String,
  status: Boolean
},
{
  timestamps: true
})

export default mongoose.model('Classes', ClassesSchema)
