import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from '@mui/material';

export default function CardMobile({book, handleDeleteCate, handleOpen, handleOpen1}) {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const handleClick =(id) =>{
    navigate(`/categorydetail/${id}`); 
  }
  return (
    <Card sx={{ maxWidth: 400, minWidth: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image= {book.image_base64}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Name: {book.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {book.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {book.description}
        </Typography>
      </CardContent>
      <CardActions style={{
        display:'flex',
        justifyContent: 'flex-end'
      }}>
        {/* <Button size="small" onClick={()=>{handleOpen(book.id)}}>Detail</Button> */}
       {role ===" manager" && (
        <Box>
        <Button size="small" onClick={()=>{handleOpen1(book.id)}}>Edit</Button>
        <Button size="small" onClick={()=>{handleDeleteCate(book.id)}}>Delete</Button>
        </Box>
       )}
        {
            role === 'user' && (
                <Button size="small" onClick ={()=>{handleOpen(book.id)}}>
                    <AddShoppingCartIcon></AddShoppingCartIcon>
                </Button>
            )
        }
        
      </CardActions>
    </Card>
  );
}
