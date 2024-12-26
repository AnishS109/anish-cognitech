import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Python from "../Images/Python_Course.jpeg";
import ReactIMG from "../Images/React_Course.jpeg";
import sqlIMG from "../Images/SQL_Course.jpeg";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box } from '@mui/material';
import Loader from "../components/Loader.jsx"

const CoursesCards = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://anish-cognitech-backend.onrender.com/latest-course");
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    fetchCourses();
  }, []);

  const staticImages = {
    "Python Course": Python,
    "React Course": ReactIMG,
    "SQL Course": sqlIMG,
  };

  const handleOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null); 
  };

  const handleEnrollOpen = () => {
    setEnrollOpen(true);
  };

  const handleEnrollClose = () => {
    setEnrollOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {loading ? (
          <Loader/>
        ) : courses.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 3 }}>
            No courses available.
          </Typography>
        ) : (
          courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  transition: "transform 0.4s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 10px 16px rgba(0, 0, 0, 0.8)",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 160, objectFit: 'fill' }}
                  component="img"
                  image={staticImages[course.course_name] || Python} // Fallback to Python image
                  alt={course.course_name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.course_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpen(course)}>
                    View Course
                  </Button>
                  <Button size="small" onClick={handleEnrollOpen}>
                    Enroll Course
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Dialog for Viewing Course */}
      {selectedCourse && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{selectedCourse.course_name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              {selectedCourse.description}
            </Typography>
            <img
              src={staticImages[selectedCourse.course_name] || Python}
              alt={selectedCourse.course_name}
              style={{ width: '100%', height: 'auto' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Dialog for Enroll */}
      {enrollOpen && (
        <Dialog open={enrollOpen} onClose={handleEnrollClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
            Sign In to Enroll
          </DialogTitle>
          <DialogContent sx={{ padding: '24px' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '20px' }}>
              To enroll in this course, please sign in.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <NavLink to={"/login"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEnrollClose}
                  sx={{ padding: '10px 20px' }}
                >
                  Sign In
                </Button>
              </NavLink>
            </Box>
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
              Don't have an account?{' '}
              <NavLink to={"/register"}>
                <span style={{ color: '#1976d2', cursor: 'pointer' }}>Sign Up</span>
              </NavLink>
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={handleEnrollClose} sx={{ color: '#1976d2' }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CoursesCards;
