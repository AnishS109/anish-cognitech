import cluster from "cluster";
import os from "os";
import express from "express";
import connectDB from "./utils/database.js";
import userRegister from "./routes/userRegister.js";
import latestCourse from "./routes/latestCourse.js";
import login from "./routes/login.js";
import allCourses from "./routes/allcourses.js";
import enrolledCourse from "./routes/enrolledCourses.js";
import AddCourse from "./routes/AddCourse.js";
import router from "./routes/FetchCourse.js";
import AdminStudentFetch from "./routes/AdminStudentFetch.js";
import AdminUserManage from "./routes/AdminUserManage.js";
import AdminDeleteCourse from "./routes/AdminDeleteCourse.js";
import AssignTeacher from "./routes/AssignTeacher.js";
import TeacherDashBoard from "./routes/TeacherDashBoard.js";
import TeachermanageCourse from "./routes/TeacherManageCourse.js";

const numCPUs = os.cpus().length;

if (cluster.isMaster) {

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Spawning a new one...`);
    cluster.fork();
  });
} else {
  const app = express();

  connectDB();

  // Middleware and routes
  app.use(express.json()); // To parse JSON bodies
  app.use("/api/user", userRegister);
  app.use("/api/latest", latestCourse);
  app.use("/api/login", login);
  app.use("/api/all", allCourses);
  app.use("/api/enrolled", enrolledCourse);
  app.use("/api/add-course", AddCourse);
  app.use("/api/router", router);
  app.use("/api/admin-s", AdminStudentFetch);
  app.use("/api/admin-user-m", AdminUserManage);
  app.use("/api/admin-d", AdminDeleteCourse);
  app.use("/api/admin-t", AssignTeacher);
  app.use("/api/teacher-dashboard", TeacherDashBoard);
  app.use("/api/teacher-manage-course", TeachermanageCourse);

  app.use((req, res, next) => {
    console.log("Backend nahi chal raha bhai");
    res.status(404).send("Route not found");
  });

  const PORT = 5001;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}
