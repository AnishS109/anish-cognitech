import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Python from "../Images/Python_Course.jpeg";
import ReactIMG from "../Images/React_Course.jpeg";
import sqlIMG from "../Images/SQL_Course.jpeg";
import Artificial_IntelligenceIMG from "../Images/AI.jpeg";
import ExpressIMG from "../Images/expressJS.jpeg";
import javaIMG from "../Images/java.jpeg";
import machineLearningIMG from "../Images/MachineLearning.jpeg";
import mongoDBIMG from "../Images/mongoDB.jpeg";
import nodeJSIMG from "../Images/nodeJS.jpeg";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';  // Import your Loader component

const StudentCourseCards = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null); 
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [loading, setLoading] = useState(true);  // Loader state

  const location = useLocation();
  const studentIdFromLocation = location.state?.student_id;
  const studentId = studentIdFromLocation || localStorage.getItem('student_id');

  useEffect(() => {
    if (studentId) {
      localStorage.setItem('student_id', studentId);
    } else {
      console.error("Student ID is missing.");
    }
  }, [studentId]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://anish-cognitech-backend.onrender.com/all-courses");
        setCourses(response.data);
        setLoading(false);  // Hide loader when data is fetched
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);  // Hide loader even if there is an error
      }
    };
    fetchCourses();
  }, []);

  const staticImages = {
    "python course": Python,
    "react course": ReactIMG,
    "sql course": sqlIMG,
    "java course": javaIMG,
    "express js course": ExpressIMG,
    "mongo db course": mongoDBIMG,
    "node js course": nodeJSIMG,
    "artificial intelligence course": Artificial_IntelligenceIMG,
    "machine learning course": machineLearningIMG
  };

  const normalizeCourseName = (name) => {
    return name.trim().toLowerCase().replace(/\s+/g, ' ');
  };

  const handleOpen = (course) => { 
    setSelectedCourse(course);  
    setOpen(true);  
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);  
  };

  const handleEnrollOpen = (course) => {
    setSelectedCourse(course);
    setEnrollOpen(true);  
  };

  const handleEnrollClose = () => {
    setEnrollOpen(false); 
  };

  const handleAddCourse = async () => {
    if (studentId && selectedCourse) {
      try {
        const response = await axios.post("https://anish-cognitech-backend.onrender.com/api/enrolled/enrolled-course", {
          student_id: studentId,
          course_id: selectedCourse.id 
        });
        handleEnrollClose();
      } catch (error) {
        console.error('Error enrolling in course:', error);
      }
    } else {
      console.error("Student ID or selected course is missing.");
    }
  };

  return (
    <>
      <Box sx={{ padding: { xs: 1, sm: 2, md: 3 }, maxWidth: '1450px', margin: 'auto' }}>
        {loading ? (  // Display loader while loading courses
          <Loader />
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {courses.map((course, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  maxWidth: 345, 
                  transition: "transform 0.4s ease, box-shadow 0.2s ease", 
                  "&:hover": { transform: "scale(1.03)", boxShadow: "0 10px 16px rgba(0, 0, 0, 0.8)" },
                  borderRadius: "12px",
                  boxShadow: 3
                }}>
                  <CardMedia
                    sx={{
                      height: 200, 
                      objectFit: 'cover',
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px"
                    }}
                    component="img"
                    image={staticImages[normalizeCourseName(course.title)] || Python}
                    alt={course.title || 'Default Course'}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {course.description.length > 150 ? course.description.slice(0, 150) + "..." : course.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleOpen(course)} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      View Course
                    </Button>
                    <Button size="small" onClick={() => handleEnrollOpen(course)} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      Enroll Course
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Course details dialog */}
        {selectedCourse && (
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{selectedCourse.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedCourse.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img
                  src={staticImages[normalizeCourseName(selectedCourse.name)] || Python}
                  alt={selectedCourse.name || 'Default Course'}
                  style={{ width: '250px', height: 'auto' }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ fontWeight: 'bold' }}>Close</Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Enrollment Confirmation Dialog */}
        {enrollOpen && (
          <Dialog open={enrollOpen} onClose={handleEnrollClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }} >
              Are you sure you want to enroll in this course?
            </DialogTitle>
            <DialogContent sx={{ padding: '24px' }}>
              <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                Please confirm if you'd like to add this course to your enrollment list.
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={handleEnrollClose} sx={{ color: '#1976d2' }}>Cancel</Button>
              <Button variant="contained" onClick={handleAddCourse} color="primary" sx={{ padding: '10px 20px' }}>
                Add Course
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );
};

export default StudentCourseCards;
