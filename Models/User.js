const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name should be at least 3 characters']
  },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: [true, 'please fill password']
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'teacher'],
    default: 'student'
  },
  age: { type: Number },
  class: { type: String },
  contact: { type: String }
})

const User = mongoose.model('User', UserSchema)
module.exports = User








