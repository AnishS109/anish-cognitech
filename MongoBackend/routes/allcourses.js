import express from "express"
import cors from "cors"
import AllCourseSchema from "../modals/allCoursesSchema.js"

const allCourses = express()

allCourses.use(cors())
allCourses.use(express.json())
allCourses.use(express.urlencoded({extended:true}))

allCourses.get("/all-courses", async (req, res) => {
  try {
    const courses = await AllCourseSchema.find({}, "course_name description lecture quiz");

    const modifiedCourses = courses.map(course => ({
      id: course._id,
      title: course.course_name,
      description: course.description,
      name: course.course_name, 
      lecture: course.lecture, 
      quiz: course.quiz  
    }));

    res.status(200).json(modifiedCourses);
  } catch (error) {
    console.error("Error fetching all-courses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default allCourses;