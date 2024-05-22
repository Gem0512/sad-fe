import { Box, Button, FormControl, Input, InputBase, InputLabel, MenuItem, Select, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';


export default function AddMobile() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        producer: '',
        type: '',
        image:null
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        const intFields = ['quantity', 'producer', 'type'];
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

        axios.post('http://localhost:8005/api/mobiles/', formData, config)
            .then(response => {
                console.log(response);
                alert("Thêm điện thoại thành công!");
                setFormData({
                  name: '',
                  price: '',
                  quantity: '',
                  description: '',
                  producer: '',
                  type: '',
                  image:null
                })
            })
            .catch(error => {
                console.log(error);
            });
      };

  
      const [dataCate, setDataCate] = useState();
      useEffect(() => {
        
        fetchData();
        fetchData1()
        
      }, []);
    const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8005/api/producers/');
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
                const response = await fetch('http://localhost:8005/api/types/');
                const responseData = await response.json();
                setDataPub(responseData);
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
      }}>Thêm Mobiles</Typography>
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
        label="Name"
        variant="outlined"
        name="name"
        style={{
            backgroundColor: 'white',
        }}
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      {/* <TextField
        fullWidth
        label="Size"
        variant="outlined"
        name="size"
        style={{
            backgroundColor: 'white',
        }}
        value={formData.size}
        onChange={handleChange}
        margin="normal"
      /> */}


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
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Producer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.producer}
          name ='producer'
          style={{
                backgroundColor: 'white',
            }}
          label="Producer"
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
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name ='type'
          value={formData.type}
          style={{
                backgroundColor: 'white',
            }}
          label="Type"
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
