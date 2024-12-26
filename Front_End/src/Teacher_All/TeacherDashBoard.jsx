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
import { blue, grey } from "@mui/material/colors";
import Loader from "../components/Loader";

const TeacherDashBoard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

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
          `http://localhost:5001/course-student-fetch/${teacherId}`
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [teacherId]);

  const handleCourseChange = (event, newIndex) => {
    setSelectedCourseIndex(newIndex);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setOpenModal(true);
  };

  const handleDeleteConfirm = async () => {
    const studentId = studentToDelete._id;
    const courseId = courses[selectedCourseIndex]?.courseId;

    if (!courseId) {
      alert("Course ID is undefined!");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5001/course/${courseId}/student/${studentId}`
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

    setOpenModal(false);
  };

  const handleDeleteCancel = () => {
    setOpenModal(false);
  };

  return (
    <TeacherLayout>
      <Box sx={{ padding: { xs: "16px", sm: "24px", md: "40px" } }}>
        {loading ? (
          <Loader />
        ) : (
          <>
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
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: blue[700],
                    marginBottom: "10px",
                  }}
                >
                  Enrolled Students
                </Typography>

                <Card
                  sx={{
                    backgroundColor: grey[100],
                    padding: "15px",
                    boxShadow: 2,
                    borderRadius: 2,
                    marginBottom: "20px",
                  }}
                >
                  <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>
                            S No.
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>
                            Student Name
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>
                            Username
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>
                            Enrollment Date
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", color: blue[800] }}>
                            REMOVE
                          </TableCell>
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
                                  onClick={() => handleDeleteClick(student)}
                                  sx={{
                                    fontSize: { xs: "12px", sm: "14px" },
                                    padding: "6px 12px",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ fontStyle: "italic", color: grey[500] }}>
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
          </>
        )}
      </Box>

      {/* Confirmation Modal */}
      <Dialog open={openModal} onClose={handleDeleteCancel} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: blue[800] }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: grey[800] }}>
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
