import { Box, Button, InputBase, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import ImgMediaCard from './small/ImgMediaCard';
import axios from 'axios';


export default function AddBook() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        quantity: '',
        des: '',
        category: '',
        publisher: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      }; 
      const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');

        console.log('formData', formData.title);

        const config = {     
            headers: { 
              'content-type': 'multipart/form-data',
              'Authorization': `Bearer ${accessToken}`
            }
        }

        axios.post('http://localhost:8002/api/books/', formData, config)
            .then(response => {
                console.log(response);
                alert("Thêm sách thành công!");
                setFormData({
                  title: '',
                  author: '',
                  price: '',
                  quantity: '',
                  des: '',
                  category: '',
                  publisher: ''
                })
            })
            .catch(error => {
                console.log(error);
            });
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
      }}>Thêm sách</Typography>
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
        fullWidth
        label="Title"
        variant="outlined"
        name="title"
        style={{
            backgroundColor: 'white',
        }}
        value={formData.title}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Author"
        variant="outlined"
        name="author"
        style={{
            backgroundColor: 'white',
        }}
        value={formData.author}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Price"
        variant="outlined"
        type="number"
        name="price"
        style={{
            backgroundColor: 'white',
        }}
        value={formData.price}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Quantity"
        variant="outlined"
        type="number"
        name="quantity"
        style={{
            backgroundColor: 'white',
        }}
        value={formData.quantity}
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
      <TextField
        style={{
                backgroundColor: 'white',
            }}
        fullWidth
        label="Category ID"
        type="number"
        variant="outlined"
        name="category"
        value={formData.category_id}
        onChange={handleChange}
        margin="normal"
      />
       <TextField
        style={{
                backgroundColor: 'white',
            }}
        fullWidth
        label="Publisher ID"
        variant="outlined"
        type="number"
        name="publisher"
        value={formData.category_id}
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
