// import React, { useEffect, useState } from 'react';
// import AdminLayout from './LAYOUT/AdminLayout';
// import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Modal, TextField, Stack } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const AdminCourseManage = () => {
//   const [allCourses, setAllCourses] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [confirmOpenModal, setConfirmOpenModal] = useState(false);
  
//   // State for the form data
//   const [courseDetails, setCourseDetails] = useState({
//     name: '',
//     description: '',
//     lectures: 0,  
//     quiz: 0,
//   });

//   const navigate = useNavigate();

//   const fetchCourses = async () => {
//     try {
//       const response = await fetch('https://anish-cognitech-backend-fwia.onrender.com/api/all/all-courses');
//       const data = await response.json();
//       setAllCourses(data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };


//   const handleAddCourse = () => {
//     navigate("/admin-add-course");  // Navigate to the course addition page
//   };

//   const handleDelete = async (courseId) => {
//     console.log(`Attempting to delete course with ID: ${courseId}`);
  
//     if (!courseId) {
//       console.error("Invalid course ID");
//       return;
//     }
  
//     try {
//       const response = await fetch(`https://anish-cognitech-backend-fwia.onrender.com/api/admin-d/delete-course/${courseId}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         // If the course was successfully deleted, update the UI
//         setAllCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
//         console.log("Course deleted successfully.");
//       } else {
//         // Log the response status and text if deletion fails
//         console.error("Failed to delete course:", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("Error in deleting course:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCourseDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   return (
//     <AdminLayout>
//       <Box sx={{ marginBottom: 3 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Box sx={{ overflowX: 'auto' }}>
//               <Table sx={{ minWidth: 650 }} aria-label="course details table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Course ID</TableCell>
//                     <TableCell>Course Name</TableCell>
//                     <TableCell>Description</TableCell>
//                     <TableCell>Update</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {allCourses.map((course) => (
//                     <TableRow key={course.id}>
//                       <TableCell>{course.id}</TableCell>
//                       <TableCell>{course.name}</TableCell>
//                       <TableCell>{course.description}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           onClick={() => handleDelete(course.id)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>

//       <center>
//         <Button
//           variant="contained"
//           sx={{ m: "10px" }}
//           onClick={handleAddCourse}
//         >
//           Add Course
//         </Button>
//       </center>

      
//     </AdminLayout>
//   );
// };

// export default AdminCourseManage;

import React, { useEffect, useState } from 'react';
import AdminLayout from './LAYOUT/AdminLayout';
import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Modal, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const AdminCourseManage = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmOpenModal, setConfirmOpenModal] = useState(false);
  const [CourseLoad, setCourseLoad] = useState(true)
  
  // State for the form data
  const [courseDetails, setCourseDetails] = useState({
    name: '',
    description: '',
    lectures: 0,  
    quiz: 0,
  });

  const [courseToDelete, setCourseToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://anish-cognitech-backend-fwia.onrender.com/api/all/all-courses');
      const data = await response.json();
      setAllCourses(data);
      setCourseLoad(false)
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = () => {
    navigate("/admin-add-course");  // Navigate to the course addition page
  };

  const handleDelete = async (courseId) => {
    setCourseToDelete(courseId);
    setConfirmOpenModal(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;
    
    try {
      const response = await fetch(`https://anish-cognitech-backend-fwia.onrender.com/api/admin-d/delete-course/${courseToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the course was successfully deleted, update the UI
        setAllCourses(prevCourses => prevCourses.filter(course => course.id !== courseToDelete));
        setConfirmOpenModal(false);
        console.log("Course deleted successfully.");
      } else {
        console.error("Failed to delete course:", response.status, response.statusText);
        setConfirmOpenModal(false);
      }
    } catch (error) {
      console.error("Error in deleting course:", error);
      setConfirmOpenModal(false);
    }
  };

  const cancelDelete = () => {
    setConfirmOpenModal(false); // Close confirmation modal without deleting
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <AdminLayout>
      <Box sx={{ marginBottom: 3 }}>
        
        <Paper sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Box sx={{ padding: '16px', mt:"5px" ,backgroundColor: 'primary.main', borderRadius: '8px 8px 0 0', color: 'white' }}>
            <Typography variant="h6">Manage All Courses</Typography>
          </Box>
          <Box sx={{ padding: '16px' }}>

            {CourseLoad ? (<Loader/>) : (
              <Table sx={{ minWidth: 650 }} aria-label="course details table">
              <TableHead sx={{ backgroundColor: 'grey.200' }}>
                <TableRow>
                  <TableCell>Course ID</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCourses.map((course) => (
                  <TableRow key={course.id} sx={{ '&:hover': { backgroundColor: 'grey.50' } }}>
                    <TableCell>{course.id}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          textTransform: 'none',
                          padding: '6px 16px',
                          '&:hover': { backgroundColor: 'error.dark' }
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
            )}
            
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: '10px', padding: '10px 20px', textTransform: 'none' }}
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpenModal} onClose={cancelDelete}>
        <DialogTitle sx={{ backgroundColor: 'error.main', color: 'white' }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this course? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary" sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" sx={{ textTransform: 'none' }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </AdminLayout>
  );
};

export default AdminCourseManage;
