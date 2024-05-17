import { Box, Button, InputBase, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';



export default function AddClothes() {
    const [formData, setFormData] = useState({
        // category_id: '',
        name:'',
        price:'',
        size:'',
        description: '',
        branch: '',
        category:''
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
            const response = await fetch('http://localhost:8003/api/clothes/', {
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
            console.log('Clothes added successfully:', responseData);
            setFormData({
                name:'',
                price:'',
                size:'',
                description: '',
                branch: '',
                category:''
              });
              alert("Thêm quần áo thành công!")
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
      }}>Thêm Quần áo</Typography>
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
        label="Price"
        type ='number'
        variant="outlined"
        name="price"
        value={formData.price}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Size"
        variant="outlined"
        multiline
        rows={4}
        style={{
            backgroundColor: 'white',
        }}
        name="size"
        value={formData.size}
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
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Branch"
        variant="outlined"
        type ='number'
        multiline
        rows={4}
        style={{
            backgroundColor: 'white',
        }}
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Category"
        variant="outlined"
        type ='number'
        multiline
        rows={4}
        style={{
            backgroundColor: 'white',
        }}
        name="category"
        value={formData.category}
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
