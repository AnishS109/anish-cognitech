import React, { useEffect, useState } from 'react';
import AdminLayout from './LAYOUT/AdminLayout';
import { Container, Grid, Typography, Table, TableHead, TableRow, TableCell, TableBody, Box, Card, CardContent } from '@mui/material';
import Loader from '../components/Loader';

const AdminDashBoard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentLoad, setStudentLoad] = useState(true);
  const [teacherLoad, setTeacherLoad] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5001/student-data');
      const data = await response.json();
      setStudents(data);
      setStudentLoad(false);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:5001/teacher-data');
      const data = await response.json();
      setTeachers(data);
      setTeacherLoad(false);
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
      <Container maxWidth sx={{ marginTop: '10px' }}>
        <Grid container spacing={3}>
          {/* Student Details Section */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 3, borderRadius: '12px' }}>
              <Box sx={{ backgroundColor: 'primary.main', color: 'common.white', padding: '16px', borderRadius: '12px 12px 0 0' }}>
                <Typography variant="h6" fontWeight="bold">Student Details</Typography>
              </Box>
              <CardContent>
                <Box sx={{ overflowX: 'auto' }}>
                  {studentLoad ? (
                    <Loader />
                  ) : (
                    <Table sx={{ minWidth: 700 }} aria-label="student details table">
                      <TableHead sx={{ backgroundColor: 'grey.200' }}>
                        <TableRow>
                          <TableCell><Typography variant="body1" fontWeight="bold">Student ID</Typography></TableCell>
                          <TableCell><Typography variant="body1" fontWeight="bold">Student Name</Typography></TableCell>
                          <TableCell><Typography variant="body1" fontWeight="bold">Username</Typography></TableCell>
                          <TableCell><Typography variant="body1" fontWeight="bold">Enrolled Courses</Typography></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.studentId} sx={{ '&:hover': { backgroundColor: 'grey.100' } }}>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.studentName}</TableCell>
                            <TableCell>{student.studentUsername}</TableCell>
                            <TableCell>
                              {student.enrolledCourses && student.enrolledCourses.length > 0
                                ? student.enrolledCourses.join(', ')
                                : 'No course enrolled'}
                            </TableCell>
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
            <Card sx={{ boxShadow: 3, borderRadius: '12px' }}>
              <Box sx={{ backgroundColor: 'primary.main', color: 'common.white', padding: '16px', borderRadius: '12px 12px 0 0' }}>
                <Typography variant="h6" fontWeight="bold">Teacher Details</Typography>
              </Box>
              <CardContent>
                <Box sx={{ overflowX: 'auto' }}>
                  {teacherLoad ? (
                    <Loader />
                  ) : (
                    <Table sx={{ minWidth: 700 }} aria-label="teacher details table">
                      <TableHead sx={{ backgroundColor: 'grey.200' }}>
                        <TableRow>
                          <TableCell><Typography variant="body1" fontWeight="bold">Teacher ID</Typography></TableCell>
                          <TableCell><Typography variant="body1" fontWeight="bold">Teacher Name</Typography></TableCell>
                          <TableCell><Typography variant="body1" fontWeight="bold">Username</Typography></TableCell>
                          <TableCell><Typography variant="body1" fontWeight="bold">Course Assigned</Typography></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teachers.map((teacher) => (
                          <TableRow key={teacher.teacher._id} sx={{ '&:hover': { backgroundColor: 'grey.100' } }}>
                            <TableCell>{teacher.teacher._id}</TableCell>
                            <TableCell>{teacher.teacher.name}</TableCell>
                            <TableCell>{teacher.teacher.username}</TableCell>
                            <TableCell>
                              {teacher.course && teacher.course.course_name
                                ? teacher.course.course_name
                                : 'No course assigned'}
                            </TableCell>
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
