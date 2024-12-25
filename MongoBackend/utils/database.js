import mongoose from "mongoose";

const mongoURL = 'mongodb+srv://root:root@lms.8dvli.mongodb.net/';

const connectDB = async() => {
  try {
    await mongoose.connect(mongoURL)
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error in connecting to Database")
  }
}

export default connectDB;