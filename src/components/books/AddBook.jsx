import { Box, Button, FormControl, Input, InputBase, InputLabel, MenuItem, Select, TextField, Typography, alpha, styled } from '@mui/material';
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
        publisher: '',
        image:''
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        const intFields = ['author', 'quantity', 'category', 'publisher'];
        let parsedValue = value;

        if (name === 'image') {
          parsedValue = files[0]; // Handle file input for image
        } else if (intFields.includes(name)) {
          parsedValue = parseInt(value, 10);
        } else if (name === 'price') {
          parsedValue = parseFloat(value);
        }

        setFormData({ ...formData, [name]: parsedValue });

        console.log(name, value)
      }; 
      const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');

        console.log('formData', formData);

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

  
      const [dataCate, setDataCate] = useState();
      useEffect(() => {
        
        fetchDataAuthor()
        fetchData();
        fetchData1()
        
      }, []);
    const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8002/api/categories/');
            const responseData = await response.json();
            setDataCate(responseData);
            console.log(responseData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        const [dataPub, setDataPub] = useState();
        const fetchData1 = async () => {
              try {
                const response = await fetch('http://localhost:8002/api/publishers/');
                const responseData = await response.json();
                setDataPub(responseData);
                console.log(responseData);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };

            const [dataAuthor, setDataAuthor] = useState();
    const fetchDataAuthor = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/authors/');
        const responseData = await response.json();
        setDataAuthor(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
            // const [cate, setCate] = React.useState('');

  // const handleChangeCate = (event) => {
  //   setCate(event.target.value);
  // };

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
      {/* <TextField
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
      /> */}

<FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Author</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.author}
          name ='author'
          style={{
                backgroundColor: 'white',
            }}
          label="Author"
          onChange={handleChange}
        >
        {
          dataAuthor && dataAuthor.map(cate => (
            <MenuItem value={cate.id}>{cate.name}</MenuItem>
          ))
        }
        </Select>
      </FormControl>
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
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.category}
          name ='category'
          style={{
                backgroundColor: 'white',
            }}
          label="Category"
          onChange={handleChange}
        >
        {
          dataCate && dataCate.map(cate => (
            <MenuItem value={cate.id}>{cate.name}</MenuItem>
          ))
        }
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Publisher</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name ='publisher'
          value={formData.publisher}
          style={{
                backgroundColor: 'white',
            }}
          label="Publisher"
          onChange={handleChange}
        >
        {
          dataPub && dataPub.map(cate => (
            <MenuItem value={cate.id}>{cate.name}</MenuItem>
          ))
        }
        </Select>
      </FormControl>
        
      <FormControl variant="standard" margin ="normal">
        <InputLabel htmlFor="image-input">
          Chọn hình ảnh
        </InputLabel>
        <Input
          id="image-input"
          name="image"
          type="file"
          onChange={handleChange}
        />
      </FormControl>


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
