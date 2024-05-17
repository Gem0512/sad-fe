import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    axios.post('http://localhost:8000/api/user/login/', {
      email: username,
      password: password
    })
    .then((response) => {
      // Xử lý phản hồi thành công từ API
      console.log('Login successful:', response.data);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('role', "user");
      navigate('/allproduct')
    })
    .catch((error) => {
      // Xử lý lỗi từ API
      console.error('Login failed:', error);
    });
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Box style={{
      display: 'flex',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #FF9482, #7D77FF)',
      height: 1020,
    }}>
      <Paper
      elevation={3}
      style={{
        width: 300,
        padding: 40,
        margin: 'auto',
        marginTop: 200,
        border: '1px solid #ccc',
        borderRadius: 5,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 40,
          display:'flex',
          justifyContent: 'center',
        }}
      >
        Login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        style={{
          width: '100%',
          marginBottom: 20,
        }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        style={{
          width: '100%',
          marginBottom: 40,
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        style={{
          width: '100%',
          borderRadius: 5,
        }}
      >
        Login
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
      Chưa có tài khoản?
      </Typography>
      <Link to="/register">Register</Link>
      </Box>
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
      Bạn là quản lí?
      </Typography>
      <Link to="/loginManager">Manager</Link>
      </Box>
    </Paper>
    </Box>
  );
}

export default Login;
