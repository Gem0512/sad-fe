import { Box, InputBase, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import SearchIcon from '@mui/icons-material/Search';
import ImgMediaCard from './small/ImgMediaCard';
import CateCard from './small/CateCard';
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

export default function AllCategory() {
const [data, setData] = useState();
  useEffect(() => {
    

    fetchData();
  }, []);
const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/categories/');
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
      <Typography style={{
        padding: 10,
        marginTop: 20,
        // marginBottom: 10,
        paddingLeft: "30%"
      }}> List category</Typography>
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
        <CateCard book ={book}
        handleDeleteCate={handleDeleteCate}></CateCard>
        </Box>
      ))
      ): searchTerm ==='' ? (
        data && data.map((book, index) => (
        <Box style={{
          marginTop: 50,
          marginRight: 30,
        }}>
        <CateCard book ={book}
        handleDeleteCate={handleDeleteCate}></CateCard>
        </Box>
      ))
      ):(
        <Box>
          <Typography>Không có kết quả phù hợp</Typography>
        </Box>
      )}
      </Box>
    </Box>
  )
}
