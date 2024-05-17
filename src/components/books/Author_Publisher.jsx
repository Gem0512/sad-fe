import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, InputBase, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';

export default function Author_Publisher() {

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);
const [dataAuthor, setDataAuthor] = useState();
const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/authors/');
        const responseData = await response.json();
        setDataAuthor(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const [dataCate, setDataCate] = useState();
const fetchData1 = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/publishers/');
        const responseData = await response.json();
        setDataCate(responseData);
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
        marginLeft: 100,
        marginRight:100,
        marginTop: 100,
        display:'flex',
        justifyContent: 'space-around'
      }}>

      <Box style={{ maxHeight: 300,}}>
      <Typography>
        AUTHOR
      </Typography>
      <List  style={{ maxHeight: 650,  overflow: 'auto',}}>
      {
        dataAuthor && dataAuthor.map((branch, index) => (
       <List sx={{ width: '100%', minWidth: 400, bgcolor: 'background.paper', }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                // primary="Brunch this weekend?"
                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                      Name:   {branch.name}
                      
                    </Typography>
                    <Typography>
                    Phone: { branch.phone}
                    </Typography>
                    <Typography>
                    Address: { branch.address}
                    </Typography>
                    
                    <Typography>
                    Email: { branch.mail}
                    </Typography>
                    
                    </React.Fragment>
                }
                />
            </ListItem>
            <CardActions style={{
                display:'flex',
                justifyContent: 'flex-end'
            }}>
                <Button size="small" >Detail</Button>
                <Button size="small">Edit</Button>
            </CardActions>
            <Divider variant="inset" component="li" />
        </List>
      ))
      }
      </List>
      </Box>

      <Box  style={{ maxHeight: 300,}}>
      <Typography>
        PUBLISHER
      </Typography>
     <List  style={{ maxHeight: 650,  overflow: 'auto',}}>
     {
        dataCate && dataCate.map((branch, index) => (
       <List sx={{ width: '100%', minWidth: 400, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                // primary="Brunch this weekend?"
                secondary={
                    <React.Fragment>
                   <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                      Name:   {branch.name}
                      
                    </Typography>
                    <Typography>
                    Phone: { branch.phone}
                    </Typography>
                    <Typography>
                    Address: { branch.address}
                    </Typography>
                    
                    <Typography>
                    Email: { branch.mail}
                    </Typography>
                    
                    
                    </React.Fragment>
                }
                />
            </ListItem>
            <CardActions style={{
                display:'flex',
                justifyContent: 'flex-end'
            }}>
                <Button size="small" >Detail</Button>
                <Button size="small">Edit</Button>
            </CardActions>
            <Divider variant="inset" component="li" />
        </List>
      ))
      }
     </List>

      </Box>

     </Box>
    </Box>
  )
}
