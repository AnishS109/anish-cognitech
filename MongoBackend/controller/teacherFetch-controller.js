import AllCourseSchema from "../modals/allCoursesSchema.js";
import AssignTeacherSchema from "../modals/assignTeacherSchema.js";
import UserRegisterSchema from "../modals/userRegisterSchema.js";

export const adminTeacherFetch = async (req, res) => {
  try {
    // Fetch all teachers
    const teachers = await UserRegisterSchema.find({ type: 'Teacher' }).select('name username _id');

    // Fetch assignments for the teachers, including courses if assigned
    const assignments = await AssignTeacherSchema.find()
      .populate("teacherId", "name username _id")
      .populate("courseId", "course_name _id")
      .exec();

    // Map teachers to include their course assignments
    const teacherCourses = teachers.map((teacher) => {
      const assignment = assignments.find(
        (assign) => assign.teacherId._id.toString() === teacher._id.toString()
      );

      return {
        teacher,
        course: assignment ? assignment.courseId : null, // If no assignment, return null
      };
    });

    res.status(200).json(teacherCourses); // Send the teacher-course assignments

  } catch (error) {
    console.error("Error fetching course assignments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const removeFromCourseteacher = async (req, res) => {
  const { teacherId, courseId } = req.body;

  try {
    // Find and delete the specific assignment based on teacherId and courseId
    const assignment = await AssignTeacherSchema.findOneAndDelete({
      teacherId: teacherId,
      courseId: courseId,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({ message: "Course Succesfully Deleted from Teacher" });
  } catch (error) {
    console.error("Error while deleting course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const courseDetailTeacher = async (req, res) => {
  try {
    // Find all teachers and populate their assigned courses
    const assignments = await AssignTeacherSchema.find()
      .populate("teacherId", "name username _id") // Populate teacher details (e.g., name and username)
      .populate("courseId", "course_name _id") // Populate course details (e.g., course_name and description)
      .exec();

    if (assignments.length === 0) {
      return res.status(404).json({ message: "No courses found for any teacher" });
    }

    // Prepare the response structure
    const teacherCourses = assignments.map((assignment) => ({
      teacher: assignment.teacherId, // Populated teacher data
      course: assignment.courseId,   // Populated course data
    }));

    res.status(200).json(teacherCourses); // Send the teacher-course assignments

  } catch (error) {
    console.error("Error fetching course assignments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const courseAssignteacher = async (req, res) => {
  const { teacher_username, courseId } = req.body;

  try {

    const course = await AllCourseSchema.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const teacher = await UserRegisterSchema.findOne({
      username: teacher_username,
      type: "Teacher",
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const existingAssignment = await AssignTeacherSchema.findOne({
      teacherId: teacher._id,
      courseId: course._id,
    });

    if (existingAssignment) {
      return res
        .status(400)
        .json({ message: "This teacher is already assigned to the course" });
    }

    const assignteacher = new AssignTeacherSchema({
      teacherId: teacher._id,
      courseId: course._id,
    });

    await assignteacher.save();
    res.status(201).json({ message: "Teacher successfully assigned to the course" });

  } catch (error) {
    console.error("Error while assigning teacher:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}