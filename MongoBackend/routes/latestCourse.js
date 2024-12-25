import express from "express"
import cors from "cors"
import LatestCourseSchema from "../modals/latestCourseSchema.js"

const latestCourse = express()

latestCourse.use(cors())
latestCourse.use(express.json())
latestCourse.use(express.urlencoded({extended:true}))

latestCourse.get("/latest-course", async(req,res) => {

  try {

    const courses = await LatestCourseSchema.find({}, "course_name description");

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.status(200).json(courses);

  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default latestCourse