import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, IconButton, Drawer, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search'; 
import { NavLink } from 'react-router-dom';
import "./StudentNavBar.css";

const StudentNavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false); 


  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleLogoutClick = () => {
    setOpenModal(true); 
  };

  

  const drawer = (
    <Box onClick={handleDrawerToggle} className="drawer-container">
      <Typography
        variant="h5"
        component="div"
        className="drawer-logo"
        sx={{ flexGrow: 1, mt: "5px", mb: "5px" }}
      >
        <SchoolIcon fontSize="large" sx={{ mr: "3px" }} />
        <span>C</span>ogniTech
      </Typography>

      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mb: 2 }} />

      <ul className="drawer-options">
        <li>
          <NavLink activeClassName="active" to="/student-dashboard">Home</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/student-course">Enrolled Courses</NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/student-about">About</NavLink>
        </li>
        <li>
          <Button
            variant="contained"
            size="small"
            sx={{ ml: "10px", mt: "10px", mr: "40px", height: "30px", textTransform: "none", bgcolor: "rgb(235, 71, 30)" }}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar position="fixed" sx={{ bgcolor: "rgb(6, 52, 104)" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SchoolIcon fontSize="large" sx={{ mr: "3px" }} />
              <Typography variant="h5" sx={{ fontFamily: "Roboto, sans-serif" }}>
                <span style={{ color: 'rgb(235, 71, 30)', fontSize: "30px", fontWeight: 1000 }}>C</span>ogniTech
              </Typography>
            </Box>
            
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <ul className='navbar-options'>
                <li>
                  <NavLink activeClassName="active" to="/student-dashboard">Home</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/student-course">Enrolled Courses</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/student-about">About</NavLink>
                </li>
              </ul>

              <Button
                variant="contained"
                size="small"
                sx={{
                  ml: "10px", mt: "10px", height: "30px", textTransform: "none", bgcolor: "rgb(235, 71, 30)"
                }}
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
            </Box>

            <IconButton onClick={handleDrawerToggle} color="inherit" aria-label="open drawer" sx={{ mr: 2, display: { md: "none" } }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box>
          <Drawer
            variant="temporary"
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: "240px" }
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Toolbar />
      </Box>

      
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to log out of your account?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="secondary" sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <NavLink to={"/"}>
            <Button color="primary" sx={{ textTransform: 'none' }}>
              Confirm
            </Button>
          </NavLink>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentNavBar;