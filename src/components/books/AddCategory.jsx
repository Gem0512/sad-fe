import { Box, Button, InputBase, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import ImgMediaCard from './small/ImgMediaCard';
import axios from 'axios';


export default function AddCategory() {
    const [formData, setFormData] = useState({
        // category_id: '',
        name:'',
        des: ''
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
            const response = await fetch('http://localhost:8002/api/categories/', {
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
            console.log('Category added successfully:', responseData);
            setFormData({
                // category_id: '',
                name:'',
                des: ''
              });
              alert("Thêm danh mục thành công!")
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
      }}>Thêm danh mục</Typography>
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
      {/* <TextField
        style={{
                backgroundColor: 'white',
            }}
        fullWidth
        label="Category ID"
        variant="outlined"
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
        margin="normal"
      /> */}
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
        fullWidth
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        style={{
            backgroundColor: 'white',
        }}
        name="des"
        value={formData.des}
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
