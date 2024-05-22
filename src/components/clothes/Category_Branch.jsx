import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Divider, InputBase, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';

export default function Category_Branch() {

  useEffect(() => {
    fetchData();
    fetchData1();
  }, []);
const [dataBranch, setDataBranch] = useState();
const fetchData = async () => {
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
const fetchData1 = async () => {
      try {
        const response = await fetch('http://localhost:8003/api/styles/');
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

      <Box >
      <Typography>
      PRODUCERS
      </Typography>
      {
        dataBranch && dataBranch.map((branch, index) => (
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
                      Branch:   {branch.name}
                      
                    </Typography>
                    <Typography>
                    Address: { branch.address}
                    </Typography>
                    <Typography>
                    Email: { branch.email}
                    </Typography>
                    
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
      ))
      }
      </Box>

      <Box>
      <Typography>
        STYLES
      </Typography>
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
                      Branch:   {branch.name}
                      
                    </Typography>
                    <Typography>
                    Des: { branch.des}
                    </Typography>
                    
                    
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
      ))
      }

      </Box>

     </Box>
    </Box>
  )
}
