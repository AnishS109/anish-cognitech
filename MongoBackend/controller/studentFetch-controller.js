import mongoose from "mongoose";
import Enrollment from "../modals/enrollmentSchema.js";
import UserRegisterSchema from "../modals/userRegisterSchema.js";
import AssignTeacherSchema from "../modals/assignTeacherSchema.js";

export const adminStudentFetch = async (req, res) => {
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
}

export const adminStudentManage = async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "Invalid student ID format" });
  }

  try {

    const student = await UserRegisterSchema.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Enrollment.deleteMany({ user: studentId });

    res.status(200).json({ message: "Student and related enrollments deleted successfully" });
  } catch (error) {
    console.error("Error in deleting student:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const teacherDashBoard = async (req, res) => {
  const { teacherId } = req.params;

  try {
    // Find the courses assigned to the teacher
    const assignedCourses = await AssignTeacherSchema.find({ teacherId }).populate("courseId");

    if (!assignedCourses.length) {
      return res.status(404).json({ message: "No courses assigned to this teacher." });
    }

    // Fetch students for each assigned course
    const courseWithStudent = await Promise.all(
      assignedCourses.map(async (assignment) => {
        const course = assignment.courseId;

        if (!course) {
          console.error("Course not found for assignment:", assignment);
          return null; // Skip if course is missing
        }

        // Fetch enrollments for the course
        const enrollments = await Enrollment.find({ course: course._id }).populate("user");

        if (!enrollments || enrollments.length === 0) {
          console.log(`No enrollments found for course ${course._id}`);
        }

        // Create a student object that includes the student ID
        const students = enrollments.map((enrollment) => {
          if (enrollment && enrollment.user) {
            return {
              _id: enrollment.user._id, // Add student ID (_id)
              name: enrollment.user.name,
              username: enrollment.user.username,
              enrollmentDate: enrollment.enrollmentDate,
            };
          } else {
            // console.error("Missing user data in enrollment:", enrollment);
            return null; // Skip invalid enrollments
          }
        }).filter(Boolean); // Remove any nulls from the array

        // Return course details with the students' info
        return {
          courseId: course._id, // Include course ID here
          courseName: course.course_name,
          students,
        };
      })
    );

    const validCourseWithStudent = courseWithStudent.filter(Boolean);

    res.json(validCourseWithStudent);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server error");
  }
}