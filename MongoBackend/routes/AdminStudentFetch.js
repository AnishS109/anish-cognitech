import express, { json, urlencoded } from "express";
import cors from "cors";
import UserRegisterSchema from "../modals/userRegisterSchema.js";
import Enrollment from "../modals/enrollmentSchema.js";

const AdminStudentFetch = express();

AdminStudentFetch.use(cors());
AdminStudentFetch.use(express.json());
AdminStudentFetch.use(express.urlencoded({ extended: true }));

AdminStudentFetch.get("/admin-student-details", async (req, res) => {
  try {

    const students = await UserRegisterSchema.find({type: "Student"}, "name username _id").exec();

    const studentDetailWithCourse = [];

    for (const student of students) {

      const enrollments = await Enrollment.find({ user: student._id })
        .populate('course', 'course_name')
        .exec();

      const courseNames = enrollments.map(enrollment => {
        if (enrollment.course) {

          return enrollment.course.course_name;

        } 
      });

      studentDetailWithCourse.push({
        studentId: student._id,
        studentName: student.name,
        studentUsername: student.username,
        enrolledCourses: courseNames  
      });
    }

    res.status(200).json(studentDetailWithCourse);

  } catch (error) {
    console.error("Error in fetching student details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

AdminStudentFetch.get("/teacher-details", async(req,res) => {

  const teachers = await UserRegisterSchema.find({type:"Teacher"},"name username _id")

  res.json(teachers)

})



export default AdminStudentFetch;
