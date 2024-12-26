import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Courses from './components/Courses'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollTop from "./ScrollTop.jsx"
import TeacherRegistration from './Teacher_All/TeacherRegistration.jsx'
import StudentRegistration from './Student_All/StudentRegistration.jsx'
import AdminRegistration from './Admin_All/AdminRegistration.jsx'
import StudentDashBoard from './Student_All/StudentDashBoard.jsx'
import AdminDashBoard from './Admin_All/AdminDashBoard.jsx'
import TeacherDashBoard from './Teacher_All/TeacherDashBoard.jsx'
import StudentCourse from './Student_All/StudentCourse.jsx'
import StudentAbout from './Student_All/StudentAbout.jsx'
import TeacherCourses from './Teacher_All/TeacherCourses.jsx'
import TeacherAbout from './Teacher_All/TeacherAbout.jsx'
import AdminUserManage from './Admin_All/AdminUserManage.jsx'
import AdminCourseManage from './Admin_All/AdminCourseManage.jsx'
import AdminAssignCourse from './Admin_All/AdminAssignCourse.jsx'
import ViewCourse from './Student_All/ViewCourses/ViewCourse.jsx'
import AddCourse from './Admin_All/AddCourse.jsx'



function App() {

  return (
    <BrowserRouter>

<ScrollTop/>
    
    <Routes>

    <Route path='/' element={<Home/>}/>

    <Route path='courses' element={<Courses/>}/>

    <Route path='login' element={<Login/>}/>

    <Route path='register' element={<Register/>}/>

    <Route path='about' element={<About/>}/>

    <Route path='teacher-registration' element={<TeacherRegistration/>}/>

    <Route path='student-registration' element={<StudentRegistration/>}/>
    
    <Route path='admin-registration' element={<AdminRegistration/>}/>

    <Route path="/student-dashboard" element={<StudentDashBoard/>}/>

    <Route path="/admin-dashboard" element={<AdminDashBoard/>}/>

    <Route path="/teacher-dashboard" element={<TeacherDashBoard/>}/>

    <Route path="/student-course" element={<StudentCourse/>}/>

    <Route path="/student-about" element={<StudentAbout/>}/>

    <Route path="/teacher-courses" element={<TeacherCourses/>}/>

    <Route path="/teacher-about" element={<TeacherAbout/>}/>

    <Route path="/admin-user-manage" element={<AdminUserManage/>}/>

    <Route path="/admin-course-manage" element={<AdminCourseManage/>}/>

    <Route path="/admin-assign-course" element={<AdminAssignCourse/>}/>

    <Route path="/course/view-course" element={<ViewCourse/>}/>

    <Route path="/admin-add-course" element={<AddCourse/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
