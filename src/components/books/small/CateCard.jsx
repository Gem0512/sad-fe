import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function CateCard({book, handleDeleteCate}) {
  const navigate = useNavigate();

  const handleClick =(id) =>{
    navigate(`/categorydetail/${id}`); 
  }
  return (
    <Card sx={{ maxWidth: 400, minWidth: 300 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image= "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         Name: {book.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {book.des}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small" onClick ={()=>{handleClick(book.id)}}>Detail</Button>
        <Button size="small" onClick={()=>{handleDeleteCate(book.id)}}>Delete</Button>
      </CardActions> */}
    </Card>
  );
}
