import mongoose from "mongoose";

const userRegisterSchema = mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      lowercase:true
    },
    username:{
      type:String,
      required:true,
      unique:true,
      lowercase:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true
    },
    phone_number:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true
    },
    experience:{
      type:String,
      default:null
    },
    type:{
      type:String,
      required:true,
      enum:["Teacher","Student","Admin"],
      default:"Student"
    },
    subject:{
      type:String,
      default:null
    }

  }
  ,{ timestamps:true })

const UserRegisterSchema = mongoose.model("UserRegister",userRegisterSchema)

export default UserRegisterSchema