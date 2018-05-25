import mongoose from 'mongoose'

let ClassesSchema = new mongoose.Schema({
  code: {
    type: String
  },
  year: String,
  semester: Number,
  label: String,
  level: String,
  status: Boolean,
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member', index: { unique: true }, sparse: true }]
},
{
  timestamps: true
})

export default mongoose.model('Classes', ClassesSchema)
