import express from "express"
import cors from "cors"
import EnrollmentSchema from "../modals/enrollmentSchema.js"
import UserRegisterSchema from "../modals/userRegisterSchema.js"
import AllCourseSchema from "../modals/allCoursesSchema.js"


const enrolledCourse = express()

enrolledCourse.use(cors())
enrolledCourse.use(express.json())
enrolledCourse.use(express.urlencoded({extended:true}))

enrolledCourse.post("/enrolled-course",async(req,res) => {

  const {student_id , course_id} = req.body

  try {

    const user = await UserRegisterSchema.findById(student_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const course = await AllCourseSchema.findById(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const existingEnrollment = await EnrollmentSchema.findOne({
      user: student_id,
      course: course_id,
    });
    if (existingEnrollment) {
      return res.status(400).json({ message: "User is already enrolled in this course" });
    }

    const enrollment = new EnrollmentSchema({
      user: student_id,
      course: course_id,
    });

    await enrollment.save();

    return res.status(200).json({ message: "Enrollment successful" });
    
  } catch (error) {

    console.error("Error enrolling in course:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
})

enrolledCourse.get("/enrolled-course", async (req, res) => {
  const { student_id } = req.query;

  try {
    // Find the enrollments for the student
    const enrollments = await EnrollmentSchema.find({ user: student_id })
      .populate("course", "course_name description lecture quiz") // Populate course details
      .populate("user", "name username") // Populate user details
      .exec();

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ message: "No courses found for this student" });
    }

    // Send back the enrolled courses
    res.status(200).json({ enrolled_courses: enrollments });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default enrolledCourse;