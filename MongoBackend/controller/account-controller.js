import UserRegisterSchema from "../modals/userRegisterSchema.js";

export const UserRegister = async(req,res) => {

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
}

export const Login = async(req,res) => {

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
}