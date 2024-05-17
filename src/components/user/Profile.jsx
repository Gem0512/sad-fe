import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputBase, InputLabel, Paper, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Visibility, VisibilityOff } from '@mui/icons-material';
export default function Profile() {
   
  
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [password, setPassword] = useState("Small");

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
  return (
    <Box style={{
      backgroundColor:'#F7EEDD',
    //   height: 'auto',
    minHeight: 1020
    }}>
      <Header></Header>
    
      <Box style={{
        // width:400,
        // maxWidth: 500,
        marginTop: 30,
        display:'flex',
        justifyContent: 'center'
      }}>
       <Paper elevation={3} style={{
            padding: 20,
            display: 'flex', 
            justifyContent: 'center',
            width: '40%'
         }}>
            <Box sx={{ width: '100%'}}>
               <Box style={{
                    display: 'flex', 
                    justifyContent: 'center'
                }}>
                    <AccountCircleIcon sx={{width: 150, height: 150}}></AccountCircleIcon>
               </Box>
               <Box style={{
                    display: 'flex', 
                    justifyContent: 'center'
                }}>
                        <Typography  variant="h4">Thanh Ngoc</Typography>
               </Box>
               <Box style={{
                    display: 'flex', 
                    justifyContent: 'center'
                }}>
                        <Typography  variant="h6">@thanhngoc</Typography>
               </Box>
               <Box style={{
                    display: 'flex', 
                    justifyContent: 'center'
                }}>
                        <Typography variant="subtitle1" sx={{paddingRight: 0.05}}>Oxc4c16a645_b21a</Typography>
                        <Button style={{
                            padding: 0
                        }}><ContentCopyIcon></ContentCopyIcon></Button>
               </Box>
               <Box sx={{
                marginTop: 5, 
                width: '100%',
                marginBottom: 2,
                display:'flex',
                justifyContent: 'center'
               }}>
                <TextField
                    id="filled-read-only-input"
                    label="First name"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    sx={{
                        width: "90%"
                    }}
                    />
               </Box>
               <Box sx={{
                marginTop: 1, 
                width: '100%',
                marginBottom: 2,
                display:'flex',
                justifyContent: 'center'
               }}>
                <TextField
                    id="filled-read-only-input"
                    label="Last name"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    sx={{
                        width: "90%"
                    }}
                    />
               </Box>
               <Box sx={{
                marginTop: 1, 
                width: '100%',
                marginBottom: 2,
                display:'flex',
                justifyContent: 'center'
               }}>
                <TextField
                    id="filled-read-only-input"
                    label="Phone"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    sx={{
                        width: "90%"
                    }}
                    />
               </Box>
               <Box sx={{
                marginTop: 1, 
                width: '100%',
                marginBottom: 2,
                display:'flex',
                justifyContent: 'center'
               }}>
                <TextField
                    id="filled-read-only-input"
                    label="Email"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    sx={{
                        width: "90%"
                    }}
                    />
               </Box>
               <Box sx={{
                marginTop: 1, 
                width: '100%',
                marginBottom: 2,
                display:'flex',
                justifyContent: 'center'
               }}>
                     <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" sx={{
                        width: "90%"
                    }} >
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            // value= "12345"
                            disabled
                            // onChange={handleChangePassword}
                            defaultValue="Small"
                            endAdornment={
                            <InputAdornment position="end" >
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        </FormControl>
               </Box>
               <Box sx={{
                    display:'flex',
                    justifyContent: 'center',
                    margin: 5
                }}>
                    <Button variant="text" style={{
                        backgroundColor: "#000",
                        color: "#ddd",
                        padding: 10
                    }}>Edit profile</Button>
                </Box>
                <Box sx={{
                    display:'flex',
                    justifyContent: 'center'
                }}>
                    <FacebookIcon></FacebookIcon>
                    <InstagramIcon></InstagramIcon>
                </Box>
                <Box sx={{
                    display:'flex',
                    justifyContent: 'center',
                }}>
                    <Typography sx={{
                        color: '#AD88C6',
                        backgroundColor: "#ddd",
                        padding: 0.5,
                        borderRadius: 1,
                        marginTop: 1
                    }}>
                        Joined May, 2021
                    </Typography>
                </Box>
            </Box>
       </Paper>
       
      </Box>
    </Box>
  )
}
