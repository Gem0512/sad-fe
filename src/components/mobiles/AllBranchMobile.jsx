import { Box, Button, Card, CardActions, CardContent, CardMedia, InputBase, Modal, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import CardMobile from './small/CardMobile';

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

export default function AllBranchMobile() {
const [data, setData] = useState();
  useEffect(() => {
    

    fetchData();
    fetchDataBranch();
  }, []);
const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8005/api/branchs/');
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
      const response = await fetch(`http://localhost:8005/api/branchs/${id}/`, {
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
      alert(`Xóa mobile có id ${id} thành công!`);
      console.log('Category deleted successfully');
  
    } catch (error) {
      console.error('Error deleting category:', error.message);
    }
  }
  const [open, setOpen] = React.useState(false);
  const [bookDetail, setBookDetail]= useState();
  const handleOpen = async (id) => {
    setOpen(true);
    console.log(id);
    try {
      const response = await fetch(`http://localhost:8005/api/branchs/${id}/`);
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

  function getNameById(input, id) {
    const item = input.find(item => item.id === id);
    return item ? item.name : 'Unknown';
}
  
const [dataBranch, setDataBranch] = useState();
const fetchDataBranch = async () => {
      try {
        const response = await fetch('http://localhost:8005/api/branchs/');
        const responseData = await response.json();
        setDataBranch(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
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
        <CardMobile book ={book}
        handleDeleteCate={handleDeleteCate}
        handleOpen={handleOpen}></CardMobile>
        </Box>
      ))
      ): searchTerm ==='' ? (
        data && data.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <CardMobile book ={book}
        handleDeleteCate={handleDeleteCate}
        handleOpen={handleOpen}></CardMobile>
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
        height="350"
        image= "https://dongphuc.dony.vn/wp-content/uploads/2021/02/ao-thun-tay-dai-nu-6.jpg"
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
          Branch: {getNameById(dataBranch, bookDetail.branch )}
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
  )
}
