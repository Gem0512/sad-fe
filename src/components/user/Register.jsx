import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = () => {
    fetch('http://127.0.0.1:8000/api/user/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
        password: password,
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Registration successful');
        navigate("/login");
      } else {
        throw new Error('Registration failed');
      }
    })
    .catch(error => {
      console.error('Registration failed:', error);
    });
  };

  return (
    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #FF9482, #7D77FF)',
      height: 1020,
    }}>
      <Paper elevation={3} style={{ width: 300, padding: 40, margin: 'auto', marginTop: 150 }}>
      <Typography 
      variant="h5" 
      component="h2" 
      gutterBottom
      style={{
        marginBottom: 40,
        fontWeight: 'bold'
      }}>
        Register
      </Typography>
      <TextField
        label="First Name"
        variant="outlined"
        style={{ width: '100%', marginBottom: 20 }}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        style={{ width: '100%', marginBottom: 20 }}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        style={{ width: '100%', marginBottom: 20 }}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        style={{ width: '100%', marginBottom: 20 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        style={{ width: '100%', marginBottom: 40 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleRegister} style={{ width: '100%' }}>
        Register
      </Button>
      <Box style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
      }}>
      <Typography style={{
        paddingTop: 5,
        fontSize: 15
      }}>
      Đã có tài khoản?
      </Typography>
      <Link to="/login">Login</Link>
      </Box>
    </Paper>
    </Box>
    
  );
}

export default Register;
