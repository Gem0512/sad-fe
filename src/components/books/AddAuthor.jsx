import { Box, Button, InputBase, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import ImgMediaCard from './small/ImgMediaCard';
import axios from 'axios';


export default function AddAuthor() {
    const [formData, setFormData] = useState({
        // category_id: '',
        name:'',
        phone: '',
        address: '',
        mail: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };


    
      const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("formData", formData)
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch('http://localhost:8002/api/authors/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              },
              body: JSON.stringify(formData)
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const responseData = await response.json();
            console.log('Author added successfully:', responseData);
            setFormData({
                name:'',
                phone: '',
                address: '',
                mail: ''
              });
              alert("Thêm tác giả thành công!")
          } catch (error) {
            console.error('Error adding book:', error);
          }
      };

  

  return (
    <Box style={{
      backgroundColor:'#F7EEDD',
      height: 1000
    }}>
      <Header></Header>
      <Typography
      style={{
        display:'flex',
        justifyContent: 'center',
        fontSize: 24,
        marginTop: 30,
        color:'#008DDA',
        fontWeight: 'bold'
      }}>Thêm tác giả sách</Typography>
      <Box style={{
        // width:400,
        // maxWidth: 500,
        marginTop: 30,
        display:'flex',
        justifyContent: 'center'
      }}>
      
       <form onSubmit={handleSubmit} style={{
        maxWidth: 800,
       }}>
      
      <TextField
        style={{
                backgroundColor: 'white',
            }}
        fullWidth
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        style={{
                backgroundColor: 'white',
            }}
        fullWidth
        label="Phone"
        variant="outlined"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Address"
        variant="outlined"
        multiline
        rows={4}
        style={{
            backgroundColor: 'white',
        }}
        name="address"
        value={formData.address}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        multiline
        rows={4}
        style={{
            backgroundColor: 'white',
        }}
        name="mail"
        value={formData.mail}
        onChange={handleChange}
        margin="normal"
      />
      
      <Button 
      style={{
        marginTop: 20,
        display: "flex", justifyContent:'flex-end'
      }} variant="contained" type="submit">Submit</Button>
    </form>
      </Box>
    </Box>
  )
}
