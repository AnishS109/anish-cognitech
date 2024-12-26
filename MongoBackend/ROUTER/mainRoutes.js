import express from "express"
import cors from "cors"

import { addCourse, adminDeleteCourse, AllCourses, deleteStudentFromCourse, LatestCourse, UpdateCourse, ViewCourse } from "../controller/course-controller.js"
import { Login, UserRegister } from "../controller/account-controller.js"
import { adminStudentFetch, adminStudentManage, teacherDashBoard } from "../controller/studentFetch-controller.js"
import { adminTeacherFetch, courseAssignteacher, courseDetailTeacher, removeFromCourseteacher } from "../controller/teacherFetch-controller.js"

const Mainroutes = express.Router()

Mainroutes.use(cors())
Mainroutes.use(express.json())
Mainroutes.use(express.urlencoded({extended:true}))

Mainroutes.get("/latest-course", LatestCourse)
Mainroutes.get("/all-courses", AllCourses)
Mainroutes.get("/course/:course_id", ViewCourse)

Mainroutes.post("/register", UserRegister)
Mainroutes.post("/login", Login)

Mainroutes.get("/course-student-fetch/:teacherId", teacherDashBoard)
Mainroutes.post("/add-lecture-video", UpdateCourse)
Mainroutes.delete("/course/:courseId/student/:studentId", deleteStudentFromCourse)

Mainroutes.get("/student-data", adminStudentFetch)
Mainroutes.get("/teacher-data", adminTeacherFetch)
Mainroutes.get("/teacher-course-data", courseDetailTeacher)
Mainroutes.post("/course-add", addCourse)
Mainroutes.post("/course-assign", courseAssignteacher)
Mainroutes.delete("/user-manage/:studentId", adminStudentManage)
Mainroutes.delete("/delete-course/:courseId", adminDeleteCourse)
Mainroutes.delete("/course-delete", removeFromCourseteacher)


export default Mainroutes;