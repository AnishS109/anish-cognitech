import express from "express";
import cors from "cors";
import Enrollment from "../modals/enrollmentSchema.js";
import AssignTeacherSchema from "../modals/assignTeacherSchema.js";
import mongoose from "mongoose";

const TeacherDashBoard = express();

TeacherDashBoard.use(cors());
TeacherDashBoard.use(express.json());
TeacherDashBoard.use(express.urlencoded({ extended: true }));

// Fetch courses with enrolled students
TeacherDashBoard.get("/course-student-fetch/:teacherId", async (req, res) => {
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

    // Remove any courses with null students data
    const validCourseWithStudent = courseWithStudent.filter(Boolean);

    // Send the course and student data to the frontend
    res.json(validCourseWithStudent);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server error");
  }
});

// Delete a student from a course
TeacherDashBoard.delete("/course/:courseId/student/:studentId", async (req, res) => {
  const { courseId, studentId } = req.params;

  try {
    // Validate `courseId` and `studentId` as ObjectIds
    const isCourseIdValid = mongoose.Types.ObjectId.isValid(courseId);
    const isStudentIdValid = mongoose.Types.ObjectId.isValid(studentId);

    if (!isCourseIdValid || !isStudentIdValid) {
      return res.status(400).json({ message: "Invalid course ID or student ID." });
    }

    // Find the enrollment and delete it
    const deletedEnrollment = await Enrollment.findOneAndDelete({
      course: courseId,
      user: studentId,
    });

    if (!deletedEnrollment) {
      return res.status(404).json({ message: "Student not found in this course." });
    }

    res.json({ message: "Student removed successfully." });
  } catch (error) {
    console.error("Error removing student:", error);
    res.status(500).json({ message: "Failed to remove student.", error });
  }
});

export default TeacherDashBoard;
