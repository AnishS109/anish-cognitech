import React from 'react';
import Layout2 from "../pages/Layout2.jsx";
import { Box, Typography } from '@mui/material';
import StudentIMG from "../Images/student.jpeg";
import TeacherIMG from "../Images/Teacher2.jpeg";
import AdminIMG from "../Images/admin.jpeg";
import { NavLink } from 'react-router-dom';

const Register = () => {
  return (
    <Layout2>
      <Box 
        sx={{
          border: "2px solid #1976d2",  
          bgcolor:"white",
          borderRadius: "8px",
          height: "auto",
          width: "80%",
          maxWidth: "700px",
          my: "50px",
          mx: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems:"center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          backgroundColor: "#f0f8ff",  
        }}
      >

        
        <Typography
          variant="h3"
          sx={{
            mt: "20px",
            mb: "10px",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            color: "#1976d2",  
          }}
        >
          Register Here
        </Typography>

        <Typography
          variant='h4'
          sx={{
            mt: "10px",
            mb: "40px",
            textAlign: "center",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            color: "#333",
          }}
        >
          Select User Type
        </Typography>

        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          
          
          <Box
            sx={{
              position: "relative",
              height: { xs: "120px", sm: "180px" },  
              width: { xs: "120px", sm: "180px" },  
              backgroundImage: `url(${StudentIMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",  
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",  
              }
            }}
          >
            <NavLink to={"/student-registration"}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  textAlign: "center",
                  p: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                  }
                }}
              >
                Student
              </Typography>
            </NavLink>
          </Box>

          
          <Box
            sx={{
              position: "relative",
              height: { xs: "120px", sm: "180px" },
              width: { xs: "120px", sm: "180px" },
              backgroundImage: `url(${TeacherIMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              }
            }}
          >
            <NavLink to={"/teacher-registration"}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  textAlign: "center",
                  p: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                  }
                }}
              >
                Teacher
              </Typography>
            </NavLink>
          </Box>

          
          <Box
            sx={{
              position: "relative",
              height: { xs: "120px", sm: "180px" },
              width: { xs: "120px", sm: "180px" },
              backgroundImage: `url(${AdminIMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
              }
            }}
          >
            <NavLink to={"/admin-registration"}>
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  textAlign: "center",
                  p: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                  }
                }}
              >
                Admin
              </Typography>
            </NavLink>
          </Box>

        </Box>

      </Box>
    </Layout2>
  );
};

export default Register;