import mongoose from "mongoose";

const mongoURL = 'mongodb+srv://root:6TmgY4T39vnnMS6b@lms.8dvli.mongodb.net/test';

const connectDB = async() => {
  try {
    await mongoose.connect(mongoURL)
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error in connecting to Database")
  }
}

export default connectDB;