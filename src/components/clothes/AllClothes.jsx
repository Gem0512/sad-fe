import { Box, Button, Card, CardActions, CardContent, CardMedia, InputBase, Modal, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import ClothesCard from './small/ClothesCard';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
  };

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  paddingTop: 5,
  paddingBottom:5,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // paddingRight: 500,
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function AllClothes() {
const [data, setData] = useState();
  useEffect(() => {
    

    fetchData();
  }, []);
const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8003/api/clothes/');
        const responseData = await response.json();
        setData(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && searchTerm !=='') {
      console.log('Enter key pressed. Search term:', searchTerm);
      try {
        const response = await fetch(`http://localhost:8003/api/search/?keyword=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('data', data)
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleDeleteCate = async (id) => {
    // setOpen(true);
    console.log(id);
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8003/api/clothes/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      fetchData();
      alert(`Xóa clothes có id ${id} thành công!`);
      console.log('Category deleted successfully');
  
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  }
  
  const [open, setOpen] = React.useState(false);
  const [bookDetail, setBookDetail]= useState();
  const [idProduct, setIdProduct] =useState();
  const handleOpen = async (id) => {
    setIdProduct(id);
    setOpen(true);
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8003/api/clothes/${id}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data', data)
      setBookDetail(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handleClose = () => setOpen(false);


  const [formData, setFormData] = useState({
    name: '',
    price: '',
    size: '',
    description: '',
    branch: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
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

    axios.put(`http://localhost:8003/api/clothes/${idEdit}/`, formData, config)
        .then(response => {
            console.log(response);
            handleClose1();
            fetchData();
            alert("Edit clothes thành công!");
            
        })
        .catch(error => {
            console.log(error);
        });
  };

  const [open1, setOpen1] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState("");
  const handleOpen1 = async (id) => {
    setOpen1(true);
    console.log(id);
    setIdEdit(id);
    try {
      const response = await fetch(`http://localhost:8003/api/clothes/${id}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data', data)
      setFormData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleClose1 = () => setOpen1(false);

  useEffect(() => {
    fetchDataBranch();
    fetchDataCate();
  }, []);
const [dataBranch, setDataBranch] = useState();
const fetchDataBranch = async () => {
      try {
        const response = await fetch('http://localhost:8003/api/producers/');
        const responseData = await response.json();
        setDataBranch(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const [dataCate, setDataCate] = useState();
const fetchDataCate = async () => {
      try {
        const response = await fetch('http://localhost:8003/api/styles/');
        const responseData = await response.json();
        setDataCate(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  function getStyleById(input, id) {
    const item = input.find(item => item.id === id);
    return item ? item.styles : 'Unknown';
}

function getProducerById(input, id) {
  const item = input.find(item => item.id === id);
  return item ? item.producer : 'Unknown';
}

const [count, setCount] = useState(0);
const handleTru = () =>{
  if(count>=1){
    setCount(count-1);
    console.log('count', count);
  }
}

const handleCong = () =>{
  setCount(count+1);
  console.log('count', count);
}
const role = localStorage.getItem('role');
const handleAddtoCart = async() =>{
  const accessToken = localStorage.getItem('accessToken');
  try {
      const response = await fetch('http://127.0.0.1:8006/api/add-to-cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          quantity: count,
        product_id: idProduct,
        product_type: 'clothes',
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Product added successfully to cart:', responseData);
        alert("Thêm vào giỏ hàng thành công thành công!")
    } catch (error) {
      console.error('Error adding product:', error);
    }
}
  return (
    <Box style={{
      backgroundColor:'#F7EEDD',
      height: 1000
    }}>
      <Header></Header>
      <Box style={{
        // width:400,
        // maxWidth: 500,
        display:'flex',
        justifyContent: 'center'
      }}>
      <Search  style={{
        marginTop: 50,
        width: 700,
      }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search category…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Search>
      </Box>
      
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
      {searchResults ? (
        searchResults.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <ClothesCard book ={book}
        handleDeleteCate={handleDeleteCate}
        handleOpen={handleOpen}
        handleOpen1={handleOpen1}></ClothesCard>
        </Box>
      ))
      ): searchTerm ==='' ? (
        data && data.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <ClothesCard book ={book}
        handleDeleteCate={handleDeleteCate}
        handleOpen={handleOpen}
        handleOpen1={handleOpen1}></ClothesCard>
        </Box>
      ))
      ):(
        <Box>
          <Typography>Không có kết quả phù hợp</Typography>
        </Box>
      )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
        <Typography>aaaaaaaaa</Typography>
          {bookDetail && (
            <Card sx={{ maxWidth: 600, minWidth: 800 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="350"
        image= {bookDetail.image_base64}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{
          marginBottom: 20
        }}>
         Name: {bookDetail.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Price: {bookDetail.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Size: {bookDetail.size}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Description: {bookDetail.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Producer: {getProducerById(dataBranch, bookDetail.producers )}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Style:{getStyleById(dataCate, bookDetail.style )}
        </Typography>
      </CardContent>
      {role==="manager" && (
        <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
      )}
    </Card>
          )}

          <Box style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 20,
            marginRight: 30,
          }}>
          <Button onClick={handleTru}>-</Button>
          <Typography  style={{
            marginTop: 5,
            paddingLeft: 15,
            paddingRight: 15
          }}>{count}</Typography>
          <Button onClick={handleCong}>+</Button>
          </Box>
       <Box style={{
        display: 'flex',
        justifyContent: 'center'
       }}>
       {role==="user" && (
        <CardActions>
        <Button size="small" onClick={handleAddtoCart}>Add to Cart</Button>
        <Button size="small">Purchase</Button>
      </CardActions>
      )}
       </Box>
        
        
        </Box>
      </Modal>

      <Box>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

      <Box sx={style}>
      <Typography>EDIT BOOK</Typography>

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
        label="Size"
        variant="outlined"
        name="size"
        style={{
            backgroundColor: 'white',
        }}
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
        style={{
                backgroundColor: 'white',
            }}
        fullWidth
        label="Category"
        type="number"
        variant="outlined"
        name="category"
        value={formData.category}
        onChange={handleChange}
        margin="normal"
      />
       <TextField
        style={{
                backgroundColor: 'white',
            }}
        fullWidth
        label="Branch"
        variant="outlined"
        type="number"
        name="branch"
        value={formData.branch}
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
      </Modal>


      </Box>
    </Box>
  )
}
