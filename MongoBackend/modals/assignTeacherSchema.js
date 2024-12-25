import mongoose from "mongoose";

const assignTeacherSchema = mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRegister", // Refers to the UserRegister collection
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "allcourses", // Refers to the allcourses collection
    required: true,
  },
});

const AssignTeacherSchema = mongoose.model("assignteacher", assignTeacherSchema);

export default AssignTeacherSchema;
