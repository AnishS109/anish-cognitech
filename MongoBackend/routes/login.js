import express from "express"
import cors from "cors"
import UserRegisterSchema from "../modals/userRegisterSchema.js"

const login = express()

login.use(cors())
login.use(express.json())
login.use(express.urlencoded({extended:true}))

login.post("/login-check", async(req,res) => {

  const {username , password} = req.body

  try {

    const user = await UserRegisterSchema.findOne({username})
    if(!user){
      return res.status(400).json({message:"Username Not Found"}) 
    }

    const passwordExists = await UserRegisterSchema.findOne({password})
    if(!passwordExists){
      return res.status(400).json({message:"Password is Incorrect"}) 
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        type: user.type,  
      },
    });
    
  } catch (error) {

    console.error("Error During Login",error)
    res.status(500).json({ message: "Server error", error: error.message });
    
  }

})

export default login