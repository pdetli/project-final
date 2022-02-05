import mongoose from "mongoose"
import crypto from "crypto"

//email validation?

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 3,
  },
  surname: {
    type: String,
    trim: true,
    minlength: 3,
  },

  //  name surname or only a username?

  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
})

export default UserSchema
