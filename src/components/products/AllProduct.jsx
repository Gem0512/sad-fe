import { Box, Button, Card, CardActions, CardContent, CardMedia, InputBase, Modal, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import ImgMediaCard from '../books/small/ImgMediaCard';
import ClothesCard from '../clothes/small/ClothesCard';
import CardProduct from './CardProduct';
import CardMobile from '../mobiles/small/CardMobile';
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

export default function AllProduct() {
const [data, setData] = useState();
const [data1, setData1] = useState();
const [data2, setData2] = useState();
  useEffect(() => {
    fetchData();
    fetchData1();
    fetchData2();
    fetchDataCate();
    fetchDataBranch();
    fetchDataBranch1();
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

    const fetchData1 = async () => {
      try {
        const response = await fetch('http://localhost:8003/api/clothes/');
        const responseData = await response.json();
        setData1(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:8005/api/mobiles/');
        const responseData = await response.json();
        setData2(responseData);
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
        const response = await fetch(`http://127.0.0.1:4002/api/ecomSys/book/search/${searchTerm}/`);
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
      const response = await fetch(`http://localhost:4002/api/ecomSys/category/delete/${id}/`, {
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
      alert(`Xóa danh mục có id ${id} thành công!`);
      console.log('Category deleted successfully');
  
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  }
  const [typeProduct, setTypeProduct] = useState();
  const [idProduct, setIdProduct] =useState();
  const [open, setOpen] = React.useState(false);
  const [bookDetail, setBookDetail]= useState();
  const handleOpen = async (id) => {
    setTypeProduct("book");
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
  const role = localStorage.getItem('role');


  const [open1, setOpen1] = React.useState(false);
  const [bookDetail1, setBookDetail1]= useState();
  const handleOpen1 = async (id) => {
    setOpen1(true);
    setTypeProduct("clothes")
    setIdProduct(id);
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8003/api/clothes/${id}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data', data)
      setBookDetail1(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handleClose1 = () => setOpen1(false);


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

  function getNameById(input, id) {
    const item = input.find(item => item.id === id);
    return item ? item.name : 'Unknown';
}

const [dataBranch1, setDataBranch1] = useState();
const fetchDataBranch1 = async () => {
      try {
        const response = await fetch('http://localhost:8005/api/producers/');
        const responseData = await response.json();
        setDataBranch1(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    const [open2, setOpen2] = React.useState(false);
    const [bookDetail2, setBookDetail2]= useState();
    const handleOpen2 = async (id) => {
      setOpen2(true);
      setTypeProduct("mobiles");
      setIdProduct(id);
      console.log(id);
      try {
        const response = await fetch(`http://localhost:8005/api/mobiles/${id}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('data', data)
        setBookDetail2(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const handleClose2 = () => setOpen2(false);
    const [count, setCount] = useState(0);
    const handleTru = () =>{
      if(count>=1){
        setCount(count-1);
      }
    }

    const handleCong = () =>{
      setCount(count+1);
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
            product_type: typeProduct,
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
      height: 'auto',
      paddingBottom: 100
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
        <CardProduct book ={book}
        handleDeleteCate={handleDeleteCate}></CardProduct>
        </Box>
      ))
      ): searchTerm ==='' ? (
        <Box style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {data && data.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <ImgMediaCard book ={book}
        handleDeleteCate={handleDeleteCate} handleOpen ={handleOpen}></ImgMediaCard>
        </Box>
      ))}
      {data1 && data1.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <ClothesCard book ={book}
        handleDeleteCate={handleDeleteCate} handleOpen= {handleOpen1}></ClothesCard>
        </Box>
      ))}
      {data2 && data2.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <CardMobile book ={book}
        handleDeleteCate={handleDeleteCate} handleOpen={handleOpen2}></CardMobile>
        </Box>
      ))}
        </Box>
      
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
        <Typography>aaaaaaaaa</Typography>
          {bookDetail1 && (
            <Card sx={{ maxWidth: 600, minWidth: 800 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="350"
        image= "https://dongphuc.dony.vn/wp-content/uploads/2021/02/ao-thun-tay-dai-nu-6.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{
          marginBottom: 20
        }}>
         Name: {bookDetail1.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Price: {bookDetail1.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Size: {bookDetail1.size}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Description: {bookDetail1.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Branch: {getNameById(dataBranch, bookDetail1.branch )}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Category:{getNameById(dataCate, bookDetail1.category )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
          )}
        
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          {bookDetail2 && (
            <Card sx={{ maxWidth: 600, minWidth: 800 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="350"
        image= "https://dongphuc.dony.vn/wp-content/uploads/2021/02/ao-thun-tay-dai-nu-6.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{
          marginBottom: 20
        }}>
         Name: {bookDetail2.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Price: {bookDetail2.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Size: {bookDetail2.size}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Description: {bookDetail2.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{
          marginBottom: 10
        }}>
          Branch: {getNameById(dataBranch1, bookDetail2.branch )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
          )}
        
        </Box>
      </Modal>
     </Box>

    </Box>
  )
}
