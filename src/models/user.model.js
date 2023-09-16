import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  dob: {
    type: Date,
  },
  photo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) next()

    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    return next()
})

const UserModel = mongoose.model("users", userSchema);

export default UserModel