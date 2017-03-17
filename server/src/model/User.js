import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({

  // ex Shoulder
  username: {
    type: String, required: true, unique: true,
  },

  // ex Axel
  name: {
  	type: String, reqiure: true, unique: true
  },


  message: {
    firstRow: { type: String, required: true },
    secondRow: { type: String, required: true } 
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', UserSchema)
export default User

