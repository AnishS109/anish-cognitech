import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StudentRegistration = () => {

  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    username: '',
    password: '',
    type: 'Student',
    subject: '',     
    experience: '',  
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone_number, email, username, password, subject, experience, type } = formData;
    const newFormData = { name, phone_number, email, username, password, subject: subject || null, experience: experience || null, type };

    console.log("Submitting form data:", newFormData);

    if (!name || !phone_number || !email || !username || !password) {
      setError('All fields are required!');
      return;
    }

    if (!/^[A-Za-z0-9]+$/.test(username)) {
      setError('Username can only contain letters and numbers.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone_number)) {
      setError('Please enter a valid phone number.');
      return;
    }

    if(username.length < 8){
      setError("Username must be at least 8 characters long.")
      return
    }

    if(password.length < 8){
      setError("Password must be at least 8 characters long.")
      return
    }

    setError('');

    try {
      const response = await fetch('https://anish-cognitech-backend-fwia.onrender.com/api/user/user-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFormData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        console.log('Form submitted successfully', result);
        navigate("/login");
      } else {
        setError(result.message || 'An error occurred while submitting the form.');
      }
    } catch (error) {
      console.error('Error in submitting the form:', error);
      setError('An error occurred while submitting the form.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        px: 2,
        bgcolor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 450,
          padding: 3,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            color: '#333',
            marginBottom: '24px',
          }}
        >
          Student Registration
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{
              marginBottom: '16px',
              fontSize: '0.9rem',
              fontWeight: '600',
            }}
          >
            {error}
          </Typography>
        )}
        {success && (
          <Typography
            color="success.main"
            variant="body2"
            align="center"
            sx={{
              marginBottom: '16px',
              fontSize: '0.9rem',
              fontWeight: '600',
            }}
          >
            Registration successful!
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: '8px',
            }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default StudentRegistration;
