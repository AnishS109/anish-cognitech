import React from 'react'
import { Box, Typography , IconButton , Divider } from "@mui/material"
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import { NavLink } from 'react-router-dom';

const StudentFooter= () => {
  return (
    <>
  <Box
    component="footer"
    sx={{
      backgroundColor: "rgb(6, 52, 104)",
      color: 'white',
      padding: 4,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      justifyContent: 'space-around',
      alignItems: { xs: 'center', md: 'flex-start' },
      gap: { xs: 4, md: 0 },
    }}
    >

    <Box sx={{ maxWidth: 250, textAlign: 'center', textAlign: { xs: 'center', md: 'left' } }}>

      <Typography variant="h6" sx={{ mb: 1 }}>

        <SchoolIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />

        Who we are

      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Your trusted partner in learning and growth. Discover courses, track progress, and connect with educators.
      </Typography>

      <Divider sx={{ backgroundColor: 'grey.600', my: 2 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>

      <NavLink to="/student-about" style={{textDecoration:"none"}}>

        <Typography variant='h6' sx={{textDecoration:"none"}}>

          <InfoIcon sx={{mb:"4.5px",mr:"3px",fontSize:"22px"}}/>

          About Us

        </Typography>

      </NavLink>

        <li>Who We Are</li>
        <li>Our Mission</li>
        <li>Why Choose Us</li>

      </ul>

    </Box>

    <Box sx={{ maxWidth: 250, textAlign: { xs: 'center', md: 'left' } }}>

      <Typography variant="h6" sx={{ mb: 1 }}>
        Get in Touch
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        We’re here to help you succeed. Contact us for support and information.
      </Typography>

      <Divider sx={{ backgroundColor: 'grey.600', my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', gap: 1 }}>

        <CallIcon />

        <Typography variant="body2">+91 909-886-9975</Typography>

      </Box>

      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', gap: 1, mt: 1 }}>

        <MailOutlineIcon />

        <Typography variant="body2">support@lms.com</Typography>

      </Box>

    </Box>

    <Box sx={{ textAlign: 'center' }}>

      <Typography variant="h6" sx={{ mb: 1 }}>

        Follow Us

      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>

        Connect with us on social media for the latest updates and resources.

      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>

        <IconButton
          sx={{
            color: 'white',
            transition: 'color 0.3s',
            '&:hover': { color: '#E1306C' },
          }}
        >

          <InstagramIcon />

        </IconButton>

        <IconButton
          sx={{
            color: 'white',
            transition: 'color 0.3s',
            '&:hover': { color: '#1DA1F2' },
          }}
        >

          <TwitterIcon />

        </IconButton>

        <IconButton
          sx={{
            color: 'white',
            transition: 'color 0.3s',
            '&:hover': { color: '#0077B5' },
          }}
        >

          <LinkedInIcon />

        </IconButton>

      </Box>

    </Box>

  </Box>

    </>
  )
}

export default StudentFooter
