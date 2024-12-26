import LatestCourseSchema from "../modals/latestCourseSchema.js";
import AllCourseSchema from "../modals/allCoursesSchema.js";
import Course from "../modals/allCoursesSchema.js" 
import mongoose from "mongoose";
import Enrollment from "../modals/enrollmentSchema.js";

export const LatestCourse = async(req,res) => {

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
};

export const AllCourses = async (req, res) => {
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
};

export const ViewCourse = async (req, res) => {
  const { course_id } = req.params;
  
  try {
    const course = await Course.findById(course_id).exec();
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const adminDeleteCourse = async(req,res) => {
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
}

export const addCourse = async (req, res) => {
  const courseData = req.body;

  try {
    // Create a new course entry using the course schema
    const newCourse = new AllCourseSchema(courseData);

    // Save to database
    await newCourse.save();

    // Send success response
    res.status(201).json({ message: "Course created successfully", data: newCourse });
  } catch (error) {
    console.error("Error saving course data:", error);
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
}

export const deleteStudentFromCourse = async (req, res) => {
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
}

export const UpdateCourse = async(req, res) => {
  const { courseId, lectureName, lectureURL, questions, mainQuiz } = req.body;

  try {
    const course = await AllCourseSchema.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    if (lectureName && lectureURL) {
      course.lectures.push({ lectureName, videoUrl: lectureURL, questions });
    }

    if (mainQuiz?.length) {
      course.QuizMain.push(...mainQuiz);
    }

    await course.save();
    res.status(200).send("Content added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}