import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export default function CardProduct({book, handleOpen, handleDeleteBook, handleOpen1}) {
    const role = localStorage.getItem('role');
  return (
    <Card sx={{ maxWidth: 400, minWidth: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image= "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg"
      />
      <CardContent>
        {
            book.title && (
                <Typography gutterBottom variant="h5" component="div"  style={{
          maxWidth: 250
        }}>
                Title: {book.title}
                </Typography>
            )
        }
        {
            book.name && (
                <Typography gutterBottom variant="h5" component="div"  style={{
          maxWidth: 250
        }}>
                Name: {book.name}
                </Typography>
            )
        }
        {/* <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          Price: {book.price}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Description: {book.des}
        </Typography> */}
        {/* <Typography variant="body2" color="text.secondary">
          Quantity: {book.quantity}
        </Typography> */}
        {
            book.des && (
                <Typography variant="body2" color="text.secondary">
                Description: {book.des}
                </Typography>
            )
        }
        {
            book.description && (
                <Typography variant="body2" color="text.secondary">
                Description: {book.description}
                </Typography>
            )
        }
      </CardContent>
      <CardActions style={{
        display:'flex',
        justifyContent: 'flex-end'
      }}>
        <Button size="small" onClick={()=>{handleOpen(book.id)}}>Detail</Button>
        {
            role === "manager" && (
                <Button size="small" onClick={()=>{handleOpen1(book.id)}}>Edit</Button>
            )
        }
        
        {
            role === 'user' && (
                <Button size="small" onClick ={()=>{handleOpen1(book.id)}}>
                    <AddShoppingCartIcon></AddShoppingCartIcon>
                </Button>
            )
        }
        {
            role === "manager" && (
                <Button size="small" onClick={()=>{handleDeleteBook(book.id)}}>Delete</Button>
            )
        }
        
      </CardActions>
    </Card>
  );
}
