
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../Utils/userSlice';
import { setIsAuthorized } from '../../Utils/isAuthorizedSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";


// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  const isAuthorized = useSelector((store) => store.isAuthorized);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  // user api
  const handleLogout = async () => {
    try {
      const response = await axios.get("/v1/user/logout", { withCredentials: true });
      toast.success("Logout Successfull");
      dispatch(setIsAuthorized(false));
      navigateTo("/login")
    } catch (error) {
      dispatch(setIsAuthorized(true));
      toast.error(error.response.data.message)
    }
  };

  return (
   <div className='fixed w-full top-0 z-12'>
   
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* header in normal view */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          KΛM धंदा
          </Typography>

          {/* mobile view menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
                <Typography textAlign="center">Home</Typography>
                <Typography textAlign="center">Home</Typography>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>

            </Menu>
          </Box>


          {/* header in mobile view */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           KΛM धंदा
          </Typography>


          {/* desktop menu list */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Link to={"/"}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
            </Link>
            <Link to={"/job/getall"}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                All Jobs
              </Button>
            </Link>



          </Box>

          {/* user */}
        {
          user && user.role === "Employer" ? (<>
           <Link to={"/job/post"}>
           <Button variant="contained" sx={{mr:2, backgroundColor:"lightskyblue"}}>
            + New Job
          </Button>
           </Link>
           <Link to={"/job/me"}>
           <Button variant="contained" sx={{mr:2, backgroundColor:"lightskyblue"}}>
           VIEW YOUR JOBS
          </Button>
           </Link>
          </>):(<>
            
          </>)
        }
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" >
                <Link to={"/applications/me"}>
                    {
                      user && user.role === "Employer" ? "APPLICATIONS" : "MY APPLICATIONS"
                    }

                </Link>
                  </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
              </MenuItem>


            </Menu>
          </Box>


        </Toolbar>
      </Container>
     
    </AppBar>
   </div>
  );
}
export default NavBar;