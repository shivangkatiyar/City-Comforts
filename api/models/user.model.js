import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  aadhar: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  idcard: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  isSeller: {
    type: Boolean,
    default:false
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
  isVerified: {
    type: Boolean,
    default:false
  },
},{
  timestamps:true
});

export default mongoose.model("User", userSchema)