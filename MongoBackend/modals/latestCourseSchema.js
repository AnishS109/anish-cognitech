import mongoose from "mongoose";

const latestCourseSchema = mongoose.Schema(
  {
    course_name:{
      type:String,
      required:true,
      lowercase:true
    },
    description:{
      type:String,
      required:true,
      lowercase:true
    }
  }
  ,{ timestamps:true })

const LatestCourseSchema = mongoose.model("latestcourses",latestCourseSchema)

export default LatestCourseSchema