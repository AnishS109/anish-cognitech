import React, { useEffect, useState } from 'react';
import AdminLayout from './LAYOUT/AdminLayout';
import { Container, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box, Card, CardContent, Divider } from '@mui/material';
import Loader from '../components/Loader';

const AdminDashBoard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentLoad, setStudentLoad] = useState(true)
  const [TeacherLoad, setTeacherLoad] = useState(true)

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://anish-cognitech-404-back.onrender.com/api/admin-s/admin-student-details');
      const data = await response.json();
      setStudents(data);
      setStudentLoad(false)
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('https://anish-cognitech-404-back.onrender.com/api/admin-t/course-details-teacher'); 
      const data = await response.json();
      setTeachers(data);
      setTeacherLoad(false)
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  return (
    <AdminLayout>
      <Container sx={{ marginTop: '30px' }}>
        <Grid container spacing={3}>
          {/* Student Details Section */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', marginBottom: '20px' }}>
              <Box sx={{ backgroundColor: 'primary.main', color: 'common.white', padding: '10px 20px', borderRadius: '12px 12px 0 0' }}>
                <Typography variant="h6">Student Details</Typography>
              </Box>
              <CardContent>
                <Box sx={{ overflowX: 'auto' }}>

                 {studentLoad ? (<Loader/>) : (
                                    <Table sx={{ minWidth: 650 }} aria-label="student details table">
                                    <TableHead sx={{ backgroundColor: 'grey.200' }}>
                                      <TableRow>
                                        <TableCell>Student ID</TableCell>
                                        <TableCell>Student Name</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Enrolled Courses</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {students.map((student) => (
                                        <TableRow key={student.studentId} sx={{ '&:hover': { backgroundColor: 'grey.100' } }}>
                                          <TableCell>{student.studentId}</TableCell>
                                          <TableCell>{student.studentName}</TableCell>
                                          <TableCell>{student.studentUsername}</TableCell>
                                          <TableCell>{student.enrolledCourses}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                 )}
                
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Teacher Details Section */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', marginBottom: '20px' }}>
              <Box sx={{ backgroundColor: 'primary.main', color: 'common.white', padding: '10px 20px', borderRadius: '12px 12px 0 0' }}>
                <Typography variant="h6">Teacher Details</Typography>
              </Box>
              <CardContent>
                <Box sx={{ overflowX: 'auto' }}>

                  {TeacherLoad ? (<Loader/>) : (
                    <Table sx={{ minWidth: 650 }} aria-label="teacher details table">
                    <TableHead sx={{ backgroundColor: 'grey.200' }}>
                      <TableRow>
                        <TableCell>Teacher ID</TableCell>
                        <TableCell>Teacher Name</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Course Assigned</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teachers.map((teacher) => (
                        <TableRow key={teacher.teacher._id} sx={{ '&:hover': { backgroundColor: 'grey.100' } }}>
                          <TableCell>{teacher.teacher._id}</TableCell>
                          <TableCell>{teacher.teacher.name}</TableCell>
                          <TableCell>{teacher.teacher.username}</TableCell>
                          <TableCell>{teacher.course.course_name ? teacher.course.course_name : "No Course Assigned"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  )}
                  
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashBoard;
