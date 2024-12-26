import React, { useEffect, useState } from 'react';
import AdminLayout from './LAYOUT/AdminLayout';
import {
  Box,
  Button,
  Dialog,
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
  Paper,
} from '@mui/material';
import Loader from '../components/Loader';

const AdminAssignCourse = () => {
  const [openModal, setOpenModal] = useState(false);
  const [assignCourse, setAssignCourse] = useState({
    teacher_username: '',
    courseId: '',
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [courseLoad, setCourseLoad] = useState(true);

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
      const response = await fetch('http://localhost:5001/course-assign', {
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
      const response = await fetch('http://localhost:5001/teacher-course-data');
      const data = await response.json();
      setTeachers(Array.isArray(data) ? data : []);
      setCourseLoad(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (teacherId, courseId) => {
    try {
      const response = await fetch('http://localhost:5001/course-delete', {
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
      <Box sx={{ padding: { xs: 3, sm: 4 }, marginBottom: 4 }}>
        {/* Header */}
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
          Assign Courses to Teachers
        </Typography>

        {/* Assign Course Button */}
        <Box textAlign="center" mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
            }}
          >
            Assign Course
          </Button>
        </Box>

        {/* Assign Course Modal */}
        <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 600, textAlign: 'center', }}>Assign Course to Teacher</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <TextField
                  variant="outlined"
                  label="Teacher Username"
                  name="teacher_username"
                  fullWidth
                  value={assignCourse.teacher_username}
                  onChange={handleAssignCourse}
                  placeholder="Enter the teacher's username"
                  sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    '& .MuiInputBase-root': { borderRadius: '8px' },
                  }}
                />
                <TextField
                  variant="outlined"
                  label="Course ID"
                  name="courseId"
                  fullWidth
                  value={assignCourse.courseId}
                  onChange={handleAssignCourse}
                  placeholder="Enter course ID"
                  sx={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    '& .MuiInputBase-root': { borderRadius: '8px' },
                  }}
                />
                <Box textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: '100%',
                      fontSize: '16px',
                      fontWeight: '600',
                      padding: '12px',
                      borderRadius: '8px',
                    }}
                  >
                    Assign
                  </Button>
                </Box>
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
        />
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          message={error}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />

        {/* Teacher Details Table */}

        <Box
          sx={{
          padding: '16px',
          mt: {lg:"-14px", xs:"-4px"},
          backgroundColor: 'primary.main',
          borderRadius: '8px 8px 0 0',
          color: 'white',
          mt:3,
          }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Assigned Teachers and Courses
          </Typography>
          </Box>

        <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 2}}>

          <Box sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="teacher details table">
              <TableHead sx={{ backgroundColor: 'grey.100' }}>
                <TableRow >
                  <TableCell><Typography variant="body1" fontWeight="bold">Teacher ID</Typography></TableCell>
                  <TableCell><Typography variant="body1" fontWeight="bold">Teacher Name</Typography></TableCell>
                  <TableCell><Typography variant="body1" fontWeight="bold">Username</Typography></TableCell>
                  <TableCell><Typography variant="body1" fontWeight="bold">Course Assigned</Typography></TableCell>
                  <TableCell><Typography variant="body1" fontWeight="bold">Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseLoad ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Box textAlign="center">
                        <Loader />
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <TableRow key={teacher.teacher._id}>
                      <TableCell>{teacher.teacher._id}</TableCell>
                      <TableCell>{teacher.teacher.name}</TableCell>
                      <TableCell>{teacher.teacher.username}</TableCell>
                      <TableCell>{teacher.course.course_name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleDelete(teacher.teacher._id, teacher.course._id)
                          }
                          sx={{
                            padding: '6px 16px',
                            fontSize: '14px',
                            borderRadius: '6px',
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminAssignCourse;
