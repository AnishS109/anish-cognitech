import React, { useEffect, useState } from 'react';
import AdminLayout from './LAYOUT/AdminLayout';
import {
  Box,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Paper
} from '@mui/material';

const AdminAssignCourse = () => {
  const [openModal, setOpenModal] = useState(false);
  const [assignCourse, setAssignCourse] = useState({
    teacher_username: '',
    courseId: '',
  });
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [CourseLoad, setCourseLoad] = useState(true)

  const handleAssignCourse = (e) => {
    const { name, value } = e.target;
    setAssignCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setAssignCourse({ teacher_username: '', courseId: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://anish-cognitech.onrender.com/api/admin-t/course-assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignCourse),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setError('');
        handleClose();
        fetchTeachers(); // Refresh teacher list
      } else {
        setError(data.message || 'Failed to assign course');
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Error in assigning the course');
      setSuccessMessage('');
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch('https://anish-cognitech.onrender.com/api/admin-t/course-details-teacher');
      const data = await response.json();
      setTeachers(Array.isArray(data) ? data : []);
      setCourseLoad(false)
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://anish-cognitech.onrender.com/api/admin-t/all-courses');
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  const handleDelete = async (teacherId, courseId) => {
    try {
      const response = await fetch('https://anish-cognitech.onrender.com/api/admin-t/course-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacherId, courseId }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        fetchTeachers(); // Refresh the list
      } else {
        setError(data.message || 'Failed to delete assignment');
      }
    } catch (error) {
      setError('Error in deleting the course');
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ padding: 3 }}>
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          Assign Courses to Teachers
        </Typography>

        {/* Assign Course Button */}
        <center>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
          >
            Assign Course
          </Button>
        </center>

        {/* Assign Course Modal */}
        <Dialog open={openModal} onClose={handleClose} fullWidth>
          <DialogTitle>Assign Course to Teacher</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  variant="outlined"
                  label="Teacher Username"
                  name="teacher_username"
                  fullWidth
                  value={assignCourse.teacher_username}
                  onChange={handleAssignCourse}
                />

                {/* Replace the select input with a text input for course ID */}
                <TextField
                  variant="outlined"
                  label="Enter Course ID"
                  name="courseId"
                  fullWidth
                  value={assignCourse.courseId}
                  onChange={handleAssignCourse}
                  placeholder="Type course ID"
                />

                <center>
                  <Button type="submit" variant="contained" sx={{ width: '100px', textTransform: 'none' }}>
                    Done
                  </Button>
                </center>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          message={successMessage}
          onClose={() => setSuccessMessage('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ backgroundColor: 'green' }}
        />
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          message={error}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ backgroundColor: 'red' }}
        />

        {/* Teacher Details Table */}
        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom>
            Assigned Teachers and Courses
          </Typography>

          <Table sx={{ minWidth: 650 }} aria-label="teacher details table">
            <TableHead sx={{ backgroundColor: 'grey.100' }}>
              <TableRow>
                <TableCell>Teacher ID</TableCell>
                <TableCell>Teacher Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Course Assigned</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <TableRow key={teacher.teacher._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                    <TableCell>{teacher.teacher._id}</TableCell>
                    <TableCell>{teacher.teacher.name}</TableCell>
                    <TableCell>{teacher.teacher.username}</TableCell>
                    <TableCell>{teacher.course.course_name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(teacher.teacher._id, teacher.course._id)}
                        sx={{ textTransform: 'none' }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No courses assigned yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminAssignCourse;


