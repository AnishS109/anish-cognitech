import mongoose from "mongoose";

const enrollmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,  // Reference to User
      ref: "UserRegister",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,  // Reference to Course
      ref: "allcourses",
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
