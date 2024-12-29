import React, { useEffect, useState } from 'react';
import Layout from '../pages/Layout';
import "../styles/Home.css";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import Homeimg from "../Images/homeimg.jpeg";
import SearchIcon from '@mui/icons-material/Search';
import CoursesCards from '../Small_Components/CoursesCards';
import { NavLink } from 'react-router-dom';
import Python from '../Images/Python_Course.jpeg';
import ReactIMG from '../Images/React_Course.jpeg';
import sqlIMG from '../Images/SQL_Course.jpeg';
import Artificial_IntelligenceIMG from '../Images/AI.jpeg';
import ExpressIMG from '../Images/expressJS.jpeg';
import javaIMG from '../Images/java.jpeg';
import machineLearningIMG from '../Images/MachineLearning.jpeg';
import mongoDBIMG from '../Images/mongoDB.jpeg';
import nodeJSIMG from '../Images/nodeJS.jpeg';
import Loader from './Loader';

// import Loader from './Loader';

const Home = () => {

  const staticImages = {
    "Python Course": Python,
    "React Course": ReactIMG,
    "SQl Course": sqlIMG,
    "Java Course": javaIMG,
    "Node JS Course":nodeJSIMG,
    "Artificial Intelligence Course":Artificial_IntelligenceIMG,
    "Express JS Course":ExpressIMG,
    "Machine Learning Course":machineLearningIMG,
  };

  const [serachTerm, setSearchterm] = useState("");
  const [searchTermOutput, setSearchTermOutput] = useState([])
  const [Loading, setLoading] = useState(false)
  const [NoResults, setNoResults] = useState(false)

  const [open, setOpen] = useState(false); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollOpen, setEnrollOpen] = useState(false);

  const handleSerachChange = (event) => {
    setSearchterm(event.target.value)
  }

  useEffect(() => {
    let userSearchOutput = async() => {
      setLoading(true)
      setNoResults(false)

      try {
        const response = await fetch(`https://anish-cognitech-backend.onrender.com/search-courses/${serachTerm}`)
        const data = await response.json()
        console.log(data);
        if(response.ok){
          setNoResults(false)
          setSearchTermOutput(data)
        }else{
          setNoResults(false)
        }
      } catch (error) {
        console.log("ERROR IN SEARCHING COURSES", error)
      } finally{
        setLoading(false)
      }
    }
    userSearchOutput()
  },[serachTerm])

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
    <Layout>
      <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column-reverse", md: "row" }, // Stacks items vertically on smaller screens, horizontally on larger screens
    alignItems: "center",
    textAlign: { xs: "center", md: "left" },
    px: { xs: 2, md: 5 },
    py: { xs: 3, md: 5 },
    gap: { xs: 3, md: 5 },
  }}
>
  {/* Text Content Section */}
  <Box sx={{ flex: 1, p: { xs: 2, md: 2 } }}>
    <Typography variant="h5" className="BestPlatformText">
      Best Online Platform
    </Typography>

    <Typography variant="h3" sx={{ fontWeight: "bold", mt: 2 }}>
      Unlock your potential with every lesson.
    </Typography>

    <Typography
      variant="body1"
      sx={{ mt: 2, fontSize: { xs: "1rem", md: "1rem" } }}
    >
      Cognitech is a dynamic Learning Management System that empowers
      learners and instructors with engaging tools, fostering success and
      growth one course at a time.
    </Typography>

    {/* Search Section */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack search bar vertically on small screens
        gap: 2,
        alignItems: "center",
        width: "100%",
        maxWidth: "600px",
        mt: "15px",
      }}
    >
      {/* ---------------SEARCH COURSES----------------- */}
      <TextField
        variant="outlined"
        label="Search Courses"
        sx={{
          height: "50px",
          width: { xs: "100%", md: "80%" },
        }}
        onChange={handleSerachChange}
        value={serachTerm}
      />
      <Button
        variant="contained"
        sx={{
          height: "50px",
          width: { xs: "100%", md: "auto" },
          borderRadius: "8px",
          bgcolor: "rgb(235, 71, 30)",
          mt: "3px",
          transition: "transform 0.2s ease-in-out",
          '&:hover': {
            transform: "scale(1.05)",
          },
        }}
      >
        <SearchIcon />
      </Button>
    </Box>
  </Box>

  {/* Image Section */}
  <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      mt: { xs: 3, md: 0 },
    }}
  >
    <Box
      sx={{
        backgroundImage: `url(${Homeimg})`,
        height: { xs: "300px", md: "400px" },
        width: { xs: "300px", md: "400px" },
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "50%",
        boxShadow: "0 0 30px 10px rgba(6, 52, 104, 0.8)",
      }}
    ></Box>
  </Box>
</Box>







      <Grid container spacing={2} justifyContent="center">
      {Loading ? ( // Show loader
          <Loader/>
        ) : NoResults ? ( // Show "no courses found" message
          <h1 variant="h6" sx={{ mt: 3 }}>
            No courses found for "{serachTerm}"
          </h1>
        ) : serachTerm !== "" ? (
          searchTermOutput.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
        ) : (<h1></h1>)}
      </Grid>

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




      {/* Latest Courses Section */}
      <Box
        sx={{
          width: "100%",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "700",
            ml: { xs: 0, md: "30px" },
            my: { xs: "20px", md: "20px" },
          }}
        >
          Latest Courses
        </Typography>
      </Box>

      {/* Courses Cards Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          mb: "20px",
        }}
      >
        <CoursesCards />
      </Box>

      {/* View All Courses Button */}
      <NavLink to="/courses" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            my: "20px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              ml: "10px",
              mt: "10px",
              height: "30px",
              textTransform: "none",
              color: "black",
              border: "1px solid black",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              '&:hover': {
                color: "white",
                backgroundColor: "black",
                transform: "scale(1.1)",
              },
            }}
          >
            View All Courses
          </Button>
        </Box>
      </NavLink>
    </Layout>
  );
};

export default Home;
