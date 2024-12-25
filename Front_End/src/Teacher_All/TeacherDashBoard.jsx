import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherLayout from "./LAYOUT/TeacherLayout";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { blue, grey, green } from "@mui/material/colors";

const TeacherDashBoard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [studentToDelete, setStudentToDelete] = useState(null); // Student to delete
  const location = useLocation();

  const teacherIdFromLocation = location.state?.teacher_id;
  const storedTeacherId = localStorage.getItem("teacher_id");

  useEffect(() => {
    if (teacherIdFromLocation) {
      localStorage.setItem("teacher_id", teacherIdFromLocation);
    }
  }, [teacherIdFromLocation]);

  const teacherId = teacherIdFromLocation || storedTeacherId;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://anish-cognitech-404-back.onrender.com/api/teacher-dashboard/course-student-fetch/${teacherId}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [teacherId]);

  const handleCourseChange = (event, newIndex) => {
    setSelectedCourseIndex(newIndex);
  };

  // Open the confirmation modal
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setOpenModal(true);
  };

  // Handle deletion after confirmation
  const handleDeleteConfirm = async () => {
    const studentId = studentToDelete._id;
    const courseId = courses[selectedCourseIndex]?.courseId;

    if (!courseId) {
      alert("Course ID is undefined!");
      return;
    }

    try {
      const response = await axios.delete(
        `https://anish-cognitech-404-back.onrender.com/api/teacher-dashboard/course/${courseId}/student/${studentId}`
      );

      setCourses((prevCourses) =>
        prevCourses.map((course, index) =>
          index === selectedCourseIndex
            ? {
                ...course,
                students: course.students.filter((student) => student._id !== studentId),
              }
            : course
        )
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete the student.");
    }

    // Close the modal
    setOpenModal(false);
  };

  // Close the modal without deleting
  const handleDeleteCancel = () => {
    setOpenModal(false);
  };

  return (
    <TeacherLayout>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: blue[800] }}>
          Teacher Dashboard
        </Typography>

        <Tabs
          value={selectedCourseIndex}
          onChange={handleCourseChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            marginBottom: "20px",
            borderBottom: "2px solid",
            borderColor: blue[300],
            "& .MuiTab-root": { fontWeight: "bold", color: blue[700] },
          }}
        >
          {courses.map((course, index) => (
            <Tab key={index} label={course.courseName} />
          ))}
        </Tabs>

        {courses.length > 0 ? (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", marginTop: "10px", color: blue[700] }}>
              Enrolled Students
            </Typography>

            <Card sx={{ backgroundColor: grey[100], padding: "15px", boxShadow: 2 }}>
              <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>S No.</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>Student Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>Username</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>Enrollment Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>REMOVE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {courses[selectedCourseIndex]?.students.length > 0 ? (
                      courses[selectedCourseIndex].students.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar sx={{ marginRight: "10px", backgroundColor: blue[500] }}>
                                {student.name.charAt(0)}
                              </Avatar>
                              {student.name}
                            </Box>
                          </TableCell>
                          <TableCell>{student.username}</TableCell>
                          <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDeleteClick(student)} // Open modal with student
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ fontStyle: "italic", color: grey[500] }}>
                          No students enrolled
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        ) : (
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: "20px" }}>
            No courses found.
          </Typography>
        )}
      </Box>

      {/* Modal for confirmation */}
      <Dialog open={openModal} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to remove {studentToDelete?.name} from this course?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </TeacherLayout>
  );
};

export default TeacherDashBoard;
