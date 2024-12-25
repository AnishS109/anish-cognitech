import React, { useEffect, useState } from 'react';
import StudentLayout from './LAYOUT/StudentLayout';
import axios from 'axios';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Card, CardContent, Typography, CircularProgress, Alert, Grid, Button, Box } from '@mui/material';

// Import all course images
import Python from "../Images/Python_Course.jpeg";
import sqlIMG from "../Images/SQL_Course.jpeg";
import Artificial_IntelligenceIMG from "../Images/AI.jpeg";
import ExpressIMG from "../Images/expressJS.jpeg";
import javaIMG from "../Images/java.jpeg";
import machineLearningIMG from "../Images/MachineLearning.jpeg";
import mongoDBIMG from "../Images/mongoDB.jpeg";
import nodeJSIMG from "../Images/nodeJS.jpeg";
import ReactIMG from "../Images/React_Course.jpeg";

// Create a mapping of course names to image URLs
const courseImages = {
  "Python Course": Python,
  "React Course": ReactIMG,
  "SQl Course": sqlIMG,
  "Java Course": javaIMG,
  "Express JS Course": ExpressIMG,
  "Mongo DB Course": mongoDBIMG,
  "Node JS course": nodeJSIMG,
  "Artificial Intelligence Course": Artificial_IntelligenceIMG,
  "Machine Learning Course": machineLearningIMG
};

const StudentEnrolledCourse = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize navigate

  const location = useLocation();
  const studentIdFromLocation = location.state?.student_id;
  const studentId = studentIdFromLocation || localStorage.getItem('student_id');

  // Handle course navigation
  const handleViewCourse = (course_id) => {
    navigate(`/course/view-course`, { state: { course_id } });
    
  }

  useEffect(() => {
    if (!studentId) {
      setError("Student ID is missing.");
      setLoading(false);
      return;
    }
  
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(`https://anish-cognitech-backend-fwia.onrender.com/api/enrolled/enrolled-course`, {
          params: { student_id: studentId },
        });
  
        // Check if the response contains enrolled courses
        if (response.data && response.data.enrolled_courses) {
          const transformedCourses = response.data.enrolled_courses.map((enrollment) => {
            const course = enrollment.course;  // Accessing the course object
  
            // Check if the course is valid and has necessary properties
            if (course && course._id && course.course_name && course.description) {
              return {
                course_id: course._id,  // Assuming _id is unique for each course
                name: course.course_name,  // Mapping course_name field
                description: course.description,
                lecture: course.lecture,
                quiz: course.quiz,
                image: courseImages[course.course_name] || "",  // Use the mapped image for each course
              };
            } else {
              // If course data is invalid, we log an error and return null
              console.error("Invalid course data:", course);
              return null;
            }
          }).filter(course => course !== null);  // Remove invalid courses
  
          if (transformedCourses.length > 0) {
            setEnrolledCourses(transformedCourses);
          } else {
            setError("No valid enrolled courses found.");
          }
        } else {
          setError("No enrolled courses found.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch enrolled courses", err);
        if (err.response) {
          setError(`Error: ${err.response.data.error || 'Failed to fetch enrolled courses.'}`);
        } else {
          setError('Network or server error');
        }
        setLoading(false);
      }
    };
  
    fetchEnrolledCourses();
  }, [studentId]);

  return (
    <StudentLayout>
      <Box sx={{ padding: 2 }}>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ marginTop: 3, backgroundColor: '#f8d7da', padding: 2, color: '#721c24', borderRadius: '5px' }}>
            {error}
          </Alert>
        )}

        {!loading && !error && enrolledCourses.length > 0 && (
          <Grid container spacing={3}>
            {enrolledCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.course_id}>
                <Card sx={{
                  maxWidth: 345,
                  boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.15)',
                  borderRadius: '8px',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 20px 50px rgba(0, 0, 0, 0.2)'
                  }
                }}>
                  <CardContent>
                    {/* Course Name */}
                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>
                      {course.name}
                    </Typography>

                    {/* Course Image */}
                    {course.image && (
                      <Box sx={{
                        width: '100%',
                        height: 200,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${course.image})`,
                        borderRadius: '8px',
                        marginTop: 2,
                      }} />
                    )}

                    {/* Course Description and Details */}
                    <Typography variant="body2" color="textSecondary" paragraph sx={{ marginTop: 2 }}>
                      <strong>Description:</strong> {course.description}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                      <strong>Total Lectures:</strong> {course.lecture}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Total Quiz:</strong> {course.quiz}
                    </Typography> */}
                    <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          '&:hover': { backgroundColor: '#2c6ed5' },
                          padding: '8px 16px',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          borderRadius: '8px'
                        }}
                        onClick={() => handleViewCourse(course.course_id)} // Trigger navigation
                      >
                        View Course
                      </Button>
                      
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && !error && enrolledCourses.length === 0 && (
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 5, fontSize: '1.2rem', fontWeight: 500 }}>
            No courses found for this student.
          </Typography>
        )}
      </Box>
    </StudentLayout>
  );
};

export default StudentEnrolledCourse;


