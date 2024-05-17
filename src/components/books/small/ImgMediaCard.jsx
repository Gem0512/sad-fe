import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from '@mui/material';

function get_image_base64(obj) {
  if (obj && obj.image) {
    // Kiểm tra xem obj và obj.image có tồn tại
    const base64Image = obj.image.split(",")[1]; // Tách phần base64 từ URL dữ liệu
    return base64Image;
  } else {
    // Nếu không có hoặc obj.image không tồn tại
    return null;
  }
}

export default function ImgMediaCard({book, handleOpen, handleDeleteBook, handleOpen1}) {
  const role = localStorage.getItem('role');
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
         Title: {book.title}

         {book.image}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          Price: {book.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description:  {book.image}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Quantity: {book.quantity}
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          Sale: {book.des}
        </Typography>
      </CardContent>
      <CardActions style={{
        display:'flex',
        justifyContent: 'flex-end'
      }}>
        <Button size="small" onClick={()=>{handleOpen(book.id)}}>Detail</Button>
       {role ===" manager" && (
        <Box>
        <Button size="small" onClick={()=>{handleOpen1(book.id)}}>Edit</Button>
        <Button size="small" onClick={()=>{handleDeleteBook(book.id)}}>Delete</Button>
        </Box>
       )}
        {
            role === 'user' && (
                <Button size="small" onClick ={()=>{handleOpen1(book.id)}}>
                    <AddShoppingCartIcon></AddShoppingCartIcon>
                </Button>
            )
        }
        
      </CardActions>
    </Card>
  );
}
