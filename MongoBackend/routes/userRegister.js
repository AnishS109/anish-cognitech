import express from "express"
import UserRegisterSchema from "../modals/userRegisterSchema.js"
import cors from "cors"

const userRegister = express()

userRegister.use(cors())
userRegister.use(express.json())
userRegister.use(express.urlencoded({ extended:true }))

userRegister.post("/user-register", async(req,res) => {

  const {name,phone_number,email,username,password,subject,experience,type} = req.body

  try {

    const usernameExists = await UserRegisterSchema.findOne({username})
    if(usernameExists){
      return res.status(400).json({message:"Username Already Exists"})
    }

    const emailExists = await UserRegisterSchema.findOne({email});
    if(emailExists){
      return res.status(400).json({message:"Email Already Exists"})
    }

    const phone_numberExists = await UserRegisterSchema.findOne({phone_number});
    if(phone_numberExists){
      return res.status(400).json({message:"Phone Number Already Exists"})
    }

    const user = new UserRegisterSchema({
      name,
      phone_number,
      email,
      username,
      password,
      subject,
      experience,
      type
    })

    await user.save()

    res.status(200).json({message:"Succesfully Registered"})
    
  } catch (error) {
    console.error("Error while Registering",error)
    res.status(500).json({message:"Error while Registering"})
  }
})

export default userRegister;