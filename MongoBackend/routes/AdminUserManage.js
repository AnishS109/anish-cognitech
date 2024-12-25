import express from "express";
import cors from "cors";
import UserRegisterSchema from "../modals/userRegisterSchema.js";
import Enrollment from "../modals/enrollmentSchema.js";
import mongoose from "mongoose";  
import AdminStudentFetch from "./AdminStudentFetch.js";

const AdminUserManage = express();

AdminUserManage.use(cors());
AdminUserManage.use(express.json());
AdminUserManage.use(express.urlencoded({ extended: true }));

AdminUserManage.delete("/user-manage/:studentId", async (req, res) => {
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
});


export default AdminUserManage;
