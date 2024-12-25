import React from 'react';
import Layout from '../pages/Layout';
import { Box, Typography, Grid, Container } from '@mui/material';

const About = () => {

  return (

    <Layout>

      <Container maxWidth="lg">
    
        <Box sx={{ padding: 4 , backgroundColor:"silver",mt:"10px",borderRadius:"10px"}}>

          <Typography variant="h3" component="h1" gutterBottom align="center">

            Who We Are

          </Typography>

          <Typography variant="body1" paragraph align="center">

            Welcome to <strong>Cognitech</strong>, where learning meets innovation. Our platform is designed to make education accessible, engaging, and effective for everyone—from students to educators. We’re here to support your educational journey every step of the way.

          </Typography>

        </Box>

       
        <Grid container spacing={4}>

          <Grid item xs={12} md={6}>

            <Box sx={{ padding: 2 }}>

              <Typography variant="h4" component="h2" gutterBottom>
                
                Our Mission

              </Typography>

              <Typography variant="body1" paragraph>

                To provide learners and educators with a powerful, user-friendly platform for online education. We believe that everyone should have the opportunity to enhance their skills and achieve their goals, no matter where they are.

              </Typography>

            </Box>

          </Grid>

          <Grid item xs={12} md={6}>

            <Box sx={{ padding: 2 }}>

              <Typography variant="h4" component="h2" gutterBottom>

                Our Vision

              </Typography>

              <Typography variant="body1" paragraph>

                We aim to redefine education by offering dynamic, high-quality online courses that bridge the gap between traditional and digital learning. Through our platform, we’re building a community that supports continuous personal and professional growth.

              </Typography>

            </Box>

          </Grid>

        </Grid>

        
        <Box sx={{ padding: 4, backgroundColor: 'silver', borderRadius: 2, marginTop: 4 }}>

          <Typography variant="h4" component="h2" gutterBottom align="center">

            What We Believe In

          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} sm={6} md={3}>

              <Typography variant="h6" component="h3" align="center">

                Accessibility

              </Typography>

              <Typography variant="body2" align="center">

                Education should be open to all, regardless of where you are.

              </Typography>

            </Grid>

            <Grid item xs={12} sm={6} md={3}>

              <Typography variant="h6" component="h3" align="center">

                Innovation

              </Typography>

              <Typography variant="body2" align="center">
                We leverage the latest technology to provide an interactive and seamless learning experience.
              </Typography>

            </Grid>

            <Grid item xs={12} sm={6} md={3}>

              <Typography variant="h6" component="h3" align="center">

                Collaboration

              </Typography>

              <Typography variant="body2" align="center">

                We foster a community where both students and instructors can thrive.

              </Typography>

            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" align="center">
                Excellence
              </Typography>
              <Typography variant="body2" align="center">
                We’re committed to providing top-tier courses that meet the highest standards.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Meet Our Team
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Behind <strong>Cognitech</strong> is a passionate team of educators, developers, and innovators, all working together to ensure that our platform offers the best online learning experience. We’re dedicated to constantly improving and evolving to meet the needs of today’s learners.
          </Typography>
        </Box>

        <Box sx={{ padding: 4, backgroundColor: 'silver', borderRadius: 2, marginTop: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" component="h3" align="center">
                Expert-Led Courses
              </Typography>
              <Typography variant="body2" align="center">
                Learn from industry professionals who bring real-world experience to the classroom.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" component="h3" align="center">
                Flexible Learning
              </Typography>
              <Typography variant="body2" align="center">
                Study at your own pace, whenever and wherever you want.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" component="h3" align="center">
                A Supportive Community
              </Typography>
              <Typography variant="body2" align="center">
                Connect with other learners and instructors for feedback, motivation, and collaboration.
              </Typography>
            </Grid>
          </Grid>
        </Box>

       
        <Box sx={{ padding: 4, textAlign: 'center', marginTop: 4 }}>
          <Typography variant="body1">
            At <strong>Cognitech</strong>, we believe that education is a lifelong journey. Let’s take the next step together.
          </Typography>
        </Box>
      </Container>
    </Layout>

  );
  
};

export default About;
