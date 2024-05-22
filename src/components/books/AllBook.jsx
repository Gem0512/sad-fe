import { Box, Button, Card, CardActions, CardContent, CardMedia, InputBase, Modal, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import ImgMediaCard from './small/ImgMediaCard';
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

export default function AllBook() {
const [data, setData] = useState();
  useEffect(() => {


    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8002/api/books/');
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
        const response = await fetch(`http://localhost:8002/api/search/?keyword=${searchTerm}`);
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
  const [open1, setOpen1] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState("");
  const handleOpen1 = async (id) => {
    setOpen1(true);
    console.log(id);
    setIdEdit(id);
    try {
      const response = await fetch(`http://localhost:8002/api/books/${id}/`);
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


  const [open, setOpen] = React.useState(false);
  const [bookDetail, setBookDetail]= useState();
  const [idProduct, setIdProduct] =useState();
  const handleOpen = async (id) => {
    setOpen(true);
    setIdProduct(id);
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8002/api/books/${id}/`);
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
  const handleDeleteBook = async (id) => {
    // setOpen(true);
    console.log(id);
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8002/api/books/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      fetchData();
      alert(`Xóa sách có id ${id} thành công!`);
      console.log('Book deleted successfully');
  
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
  }




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

    axios.put(`http://localhost:8002/api/books/update/${idEdit}/`, formData, config)
        .then(response => {
            console.log(response);
            handleClose1();
            fetchData();
            alert("Edit sách thành công!");
            
        })
        .catch(error => {
            console.log(error);
        });
  };
  const role = localStorage.getItem('role');
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
          product_type: 'book',
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
              placeholder="Search book…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Search>
      </Box>
      <Typography style={{
        padding: 10,
        marginTop: 20,
        // marginBottom: 10,
        paddingLeft: "22%"
      }}> List books</Typography>
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
      {searchResults && searchTerm ? (
        searchResults.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <ImgMediaCard 
        book ={book}
        handleOpen={handleOpen1}
        handleDeleteBook={handleDeleteBook}
        // handleOpen1={handleOpen1}
        ></ImgMediaCard>
        </Box>
      ))
      ): searchTerm ==='' ? (
        data && data.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <ImgMediaCard book ={book}
        handleOpen={handleOpen}
        handleDeleteBook={handleDeleteBook}
        handleOpen1={handleOpen1}
        ></ImgMediaCard>
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
        {bookDetail && (
            <Card sx={{ maxWidth: 600, minWidth: 800 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image= {bookDetail.image_base64}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{
          marginBottom: 20
        }}>
         Title: {bookDetail.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Author: {bookDetail.author.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Price: {bookDetail.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Description: {bookDetail.des}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Quantity: {bookDetail.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Category: {bookDetail.category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Publisher: {bookDetail.publisher.name}
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
        value={formData.category}
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
        value={formData.publisher}
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
