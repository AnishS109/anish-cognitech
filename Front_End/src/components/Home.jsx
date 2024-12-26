import React from 'react';
import Layout from '../pages/Layout';
import "../styles/Home.css";
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import Homeimg from "../Images/homeimg.jpeg";
import SearchIcon from '@mui/icons-material/Search';
import CoursesCards from '../Small_Components/CoursesCards';
import { NavLink } from 'react-router-dom';

const Home = () => {

  return (
    <Layout>
      <Box 
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
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
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              alignItems: "center",
              width: "100%",
              maxWidth: "600px",
              mt: "15px",
            }}
          >
            <TextField
              variant="outlined"
              label="Search Courses"
              sx={{
                height: "50px",
                width: { xs: "100%", md: "80%" },
              }}
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
