import express, { json, urlencoded } from "express";
import cors from "cors";
import UserRegisterSchema from "../modals/userRegisterSchema.js";
import Enrollment from "../modals/enrollmentSchema.js";
import AllCourseSchema from "../modals/allCoursesSchema.js";

const AdminDeleteCourse = express();

AdminDeleteCourse.use(cors());
AdminDeleteCourse.use(express.json());
AdminDeleteCourse.use(express.urlencoded({ extended: true }));

AdminDeleteCourse.delete("/delete-course/:courseId",async(req,res) => {
  const {courseId} = req.params
  
  try {

    const deleteCourse = await AllCourseSchema.findByIdAndDelete(courseId)

    if (!deleteCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    // await AllCourseSchema.deleteMany({ courseId });

    res.status(200).json({ message: 'Course deleted successfully' });
    
  } catch (error) {

    console.error("Error in deleting course:", error);
    res.status(500).json({ message: "Server error", error: error.message });
    
  }
})

export default AdminDeleteCourse;