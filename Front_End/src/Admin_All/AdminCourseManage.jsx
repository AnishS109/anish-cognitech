import React, { useEffect, useState } from 'react';
import AdminLayout from './LAYOUT/AdminLayout';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const AdminCourseManage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmOpenModal, setConfirmOpenModal] = useState(false);
  const [courseLoad, setCourseLoad] = useState(true);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://anish-cognitech-backend.onrender.com/all-courses');
      const data = await response.json();
      setAllCourses(data);
      setCourseLoad(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddCourse = () => {
    navigate('/admin-add-course');
  };

  const handleDelete = (courseId) => {
    setCourseToDelete(courseId);
    setConfirmOpenModal(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      const response = await fetch(`https://anish-cognitech-backend.onrender.com/delete-course/${courseToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAllCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseToDelete)
        );
        setConfirmOpenModal(false);
        console.log('Course deleted successfully.');
      } else {
        console.error('Failed to delete course:', response.status, response.statusText);
        setConfirmOpenModal(false);
      }
    } catch (error) {
      console.error('Error in deleting course:', error);
      setConfirmOpenModal(false);
    }
  };

  const cancelDelete = () => {
    setConfirmOpenModal(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <AdminLayout>
      <Box sx={{ marginBottom: 3, padding: isMobile ? 2 : 3, maxWidth:"99vw" }}>
        <Paper sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Box
            sx={{
              padding: '16px',
              mt: {lg:"-14px", xs:"-4px"},
              backgroundColor: 'primary.main',
              borderRadius: '8px 8px 0 0',
              color: 'white',
            }}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'}>Manage All Courses</Typography>
          </Box>
          <Box sx={{ padding: '16px' }}>
            {courseLoad ? (
              <Loader />
            ) : (
              <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="course details table">
                  <TableHead sx={{ backgroundColor: 'grey.200' }}>
                    <TableRow>
                      <TableCell><Typography variant="body1" fontWeight="bold">Course ID</Typography></TableCell>
                      <TableCell><Typography variant="body1" fontWeight="bold">Course Name</Typography></TableCell>
                      <TableCell><Typography variant="body1" fontWeight="bold">Description</Typography></TableCell>
                      <TableCell><Typography variant="body1" fontWeight="bold">Actions</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCourses.map((course) => (
                      <TableRow
                        key={course.id}
                        sx={{
                          '&:hover': { backgroundColor: 'grey.50' },
                          '& td': { fontSize: isMobile ? '14px' : '16px' },
                        }}
                      >
                        <TableCell>{course.id}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.description}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{
                              textTransform: 'none',
                              padding: isMobile ? '4px 12px' : '6px 16px',
                              '&:hover': { backgroundColor: 'error.dark' },
                            }}
                            onClick={() => handleDelete(course.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              m: '10px',
              padding: isMobile ? '8px 16px' : '10px 20px',
              textTransform: 'none',
            }}
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpenModal} onClose={cancelDelete}>
        <DialogTitle sx={{ backgroundColor: 'error.main', color: 'white' }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this course? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={cancelDelete}
            color="primary"
            sx={{
              textTransform: 'none',
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            sx={{
              textTransform: 'none',
              fontSize: isMobile ? '12px' : '14px',
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCourseManage;
