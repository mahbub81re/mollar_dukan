import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please write your fullname"],
  },
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    unique: true,
  },
  role:{
    type:String,
    default:"user"
  },
  password: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User