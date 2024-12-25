import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use useNavigate hook to get the navigate function
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return; 
    }

    const loginData = { username, password };

    try {
      const response = await fetch("https://anish-cognitech-404-back.onrender.com/api/login/login-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();

        // Navigate based on user role
        const { type, id } = result.user; // Get the role (type) and user id from the response
        if (type === 'Student') {
          navigate("/student-dashboard", { state: { student_id: id } });
        } else if (type === 'Admin') {
          navigate("/admin-dashboard");
        } else if (type === 'Teacher') {
          navigate("/teacher-dashboard" , { state: { teacher_id: id } });
        } else {
          setError("Unknown user role.");
        }
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to login. Please try again.');
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError('Error connecting to the server. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        px: 3,
        backgroundColor: '#f4f7fc', // light background color
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          padding: 4,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#3f51b5',
            mb: 3,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          ACCOUNT LOGIN
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{ marginBottom: 2 }}
          >
            {error}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '8px',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#3f51b5',
              },
            },
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '8px',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#3f51b5',
              },
            },
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            mt: 3,
            py: 1.5,
            fontSize: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#2c387e',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          Login
        </Button>

        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Typography variant="body2">
            Not yet registered?{' '}
            <NavLink to="/register" style={{ color: '#3f51b5', textDecoration: 'none' }}>
              <strong>Click here</strong>
            </NavLink> to create an account.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLogin;
