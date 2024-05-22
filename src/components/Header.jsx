import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { Badge, IconButton, Menu, MenuItem, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
function Header() {
  const role = localStorage.getItem('role');
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  return (
    <AppBar position="static" style={{
      paddingRight: 50,
      paddingTop: 15
    }}>
      <Toolbar>
        <StorefrontIcon sx={{
          height: 70,
          width: 50,
          paddingRight: 1
        }}></StorefrontIcon>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EcomSys
        </Typography>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button color="inherit" {...bindTrigger(popupState)}>
                Products
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem component={Link} to="/allproduct"  onClick={popupState.close} style={{padding: 0}}>
                  <Button color="inherit" {...bindTrigger(popupState)} style={{ width: '100%', paddingLeft: 10, paddingRight: 10}}>
                  All Products
                  </Button>
                </MenuItem>
                <MenuItem style={{padding: 0}}>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button color="inherit" {...bindTrigger(popupState)} style={{ width: '100%',}}>
                          Books
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem component={Link} to="/allbooks"  onClick={popupState.close}>All books</MenuItem>
                          <MenuItem component={Link} to="/allcategory"  onClick={popupState.close}>All category</MenuItem>
                          <MenuItem component={Link} to="/author&publisher"  onClick={popupState.close}> Author & Publisher </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </MenuItem>
                <MenuItem style={{padding: 0 }}>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button color="inherit" {...bindTrigger(popupState)} style={{ width: '100%',}}>
                          Clothes
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem component={Link} to="/allclothes"  onClick={popupState.close}>All clothes</MenuItem>
                          <MenuItem component={Link} to="/cate&branch"  onClick={popupState.close}>Producers & Styles </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </MenuItem>
                <MenuItem style={{padding: 0 }}>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button color="inherit" {...bindTrigger(popupState)} style={{ width: '100%',}}>
                          Mobiles
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem component={Link} to="/allmobiles"  onClick={popupState.close}>All mobiles</MenuItem>
                          <MenuItem component={Link} to="/allbranchmobile"  onClick={popupState.close}>Producers & Types</MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>

        {
          role=== "manager" && (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button color="inherit" {...bindTrigger(popupState)} style={{marginLeft: 40}}>
                    Manager
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem component={Link} to="/addbook"  onClick={popupState.close}>Add book</MenuItem>
                    <MenuItem component={Link} to="/addcategory"  onClick={popupState.close}>Add book category</MenuItem>
                    <MenuItem component={Link} to="/addbookauthor"  onClick={popupState.close}>Add book author</MenuItem>
                    <MenuItem component={Link} to="/addbookpublisher"  onClick={popupState.close}>Add book publisher</MenuItem>
                    <MenuItem component={Link} to="/addclothes"  onClick={popupState.close}>Add clothes</MenuItem>
                    <MenuItem component={Link} to="/addclothescategory"  onClick={popupState.close}>Add clothes styles</MenuItem>
                    <MenuItem component={Link} to="/addclothesbranch"  onClick={popupState.close}>Add clothes producer</MenuItem>
                    <MenuItem component={Link} to="/addmobile"  onClick={popupState.close}>Add mobile</MenuItem>
                    <MenuItem component={Link} to="/addmobilebranch"  onClick={popupState.close}>Add mobile producer</MenuItem>
                    <MenuItem component={Link} to="/addtypemobile"  onClick={popupState.close}>Add mobile type</MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          )
        }


        {
            role === 'user' && (
              <Button style={{
                marginLeft: 40,
                // marginRight: 

              }} 
              component={Link} to="/cart" color="inherit">
                {/* <ShoppingCartIcon></ShoppingCartIcon> */}
                <IconButton aria-label="cart" color="inherit">
                <StyledBadge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              </Button>
            )
        }
        <Button component={Link} to="/profile" color="inherit">
          <AccountCircleIcon></AccountCircleIcon>
        </Button>
        <Button component={Link} to="/login" color="inherit" onClick={()=>{
          localStorage.clear();
        }}>
          <LogoutIcon></LogoutIcon>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
