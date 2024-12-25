import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, IconButton, Drawer, Divider } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {

  

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} className="drawer-container">
      <Typography 
        variant='h5'
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
          <NavLink activeClassName="active" to="/">Home</NavLink>
        </li>

        <li>
          <NavLink activeClassName="active" to="/courses">Courses</NavLink>
        </li>

        <li>
          <NavLink activeClassName="active" to="/about">About</NavLink>
        </li>


        <li>

        <NavLink to={"/login"}>

        <Button variant='contained' size='small' sx={{ ml: "10px", mt: "10px", height: "30px", textTransform: "none", bgcolor: "rgb(235, 71, 30)" }}>Sign in</Button>

        </NavLink>

        </li>

        <li>

        <NavLink to={"/register"}>

        <Button variant='outlined' sx={{ ml: "10px", mt: "10px", height: "30px", textTransform: "none",color:"skyblue",border:"1px solid sky",
                  "&:hover":{
                    color: 'rgb(235, 71, 30)',
                    border:"1px solid rgb(235, 71, 30)"
                  }}}>Register</Button>

        </NavLink>

        </li>

      </ul>

    </Box>
  );

  return (
    <>
      <Box>

        <AppBar position="fixed" sx={{ bgcolor: "rgb(6, 52, 104)" }}>

          <Toolbar 
          sx={{ display: "flex", justifyContent: "space-between" }}>

            <Box sx={{ display: "flex", alignItems: "center" }}>

              <SchoolIcon fontSize="large" sx={{ mr: "3px" }} />
              
              <Typography variant='h5' sx={{ fontFamily: "Roboto, sans-serif" }}>

                <span style={{ color: 'rgb(235, 71, 30)', fontSize: "30px", fontWeight: 1000 }}>C</span>ogniTech

              </Typography>

            </Box>

            <Box sx={{ display: { xs:"none",md: "flex" }, alignItems: "center" }}>

              <ul className='navbar-options'>

                <li>
                  <NavLink activeClassName="active" to="/">Home</NavLink>
                </li>

                <li>
                  <NavLink activeClassName="active" to="/courses">Courses</NavLink>
                </li>

                <li>
                  <NavLink activeClassName="active" to="/about">About</NavLink>
                </li>
                
              </ul>

              <NavLink to={"/register"}>

                <Button 
                variant='outlined' 
                sx={{ 
                  ml: "10px", 
                  mt: "10px", 
                  height: "30px", 
                  textTransform: "none" ,
                  color:"skyblue",
                  border:"1px solid skyblue",
                  "&:hover":{
                    color: 'rgb(235, 71, 30)',
                    border:"1px solid rgb(235, 71, 30)"
                  }}}>Register</Button>

              </NavLink>

              <NavLink to={"/login"}>
                <Button variant='contained' size='small' sx={{ ml: "10px", mt: "10px", height: "30px", textTransform: "none", bgcolor: "rgb(235, 71, 30)" }}>Sign in</Button>
              </NavLink>

            </Box>

            <IconButton 
          onClick={handleDrawerToggle}
          color='inherit' 
          aria-label='open drawer'
          sx={{mr:2,display:{md:"none"}}}>

            <MenuIcon/>

          </IconButton>


          </Toolbar>
          
        </AppBar>

        <Box>

        <Drawer variant='temporary'
        anchor='right'
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{display:{xs:"block" , md:"none"}, "& .MuiDrawer-paper":{width:"240px"}}}>

          {drawer}

        </Drawer>
        
        </Box>

        <Toolbar/>

        
        
      </Box>
    </>
  );
};

export default NavBar;
