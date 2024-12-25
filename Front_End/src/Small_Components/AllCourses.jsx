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
import { NavLink } from 'react-router-dom';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollOpen, setEnrollOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://anish-cognitech.onrender.com/api/all/all-courses");
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
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
    const normalizedName = normalizeCourseName(course.name);
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
    <>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {courses.map((course, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345, transition: "transform 0.4s ease, box-shadow 0.2s ease", "&:hover": { transform: "scale(1.03)", boxShadow: "0 10px 16px rgba(0, 0, 0, 0.8)" } }}>
                  <CardMedia 
                    sx={{ height: 160, objectFit: 'fill' }} 
                    component="img" 
                    image={staticImages[normalizeCourseName(course.name)] || Python} 
                    alt={course.name || 'Default Course'} 
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.title}
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
            );
          })}
        </Grid>

        {selectedCourse && (
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{selectedCourse.name}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" paragraph>
                {selectedCourse.description}
              </Typography>
              <img 
                src={staticImages[normalizeCourseName(selectedCourse.name)] || Python} 
                alt={selectedCourse.name || 'Default Course'} 
                style={{ width: '100%', height: 'auto' }} 
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        )}

{enrollOpen && (
          <Dialog open={enrollOpen} onClose={handleEnrollClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>Sign In to Enroll</DialogTitle>
            <DialogContent sx={{ padding: '24px' }}>
              <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                To enroll in this course, please sign in.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <NavLink to={"/login"}>
                <Button variant="contained" color="primary" onClick={handleEnrollClose} sx={{ padding: '10px 20px' }}>
                  Sign In
                </Button>
                </NavLink>
              </Box>
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                Don't have an account? <NavLink to={"/register"}> <span style={{ color: '#1976d2', cursor: 'pointer' }}>Sign Up</span></NavLink>
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={handleEnrollClose} sx={{ color: '#1976d2' }}>Cancel</Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </>
  );
};

export default AllCourses;