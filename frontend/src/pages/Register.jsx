import React, { useEffect, useRef ,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import { Outlet, useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MuiAlert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CreateUser } from '../Utils/AuthRequest';
import Navbar from '../components/Navbar';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Copyright(props) {

  return (
    <Typography variant="body2" style={{color:"rgba(231, 227, 252, 0.87)"}} color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
    const navigation = useNavigate()
    const signIn = () => {
        navigation(`/sign-in`)
      };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      password: data.get('password'),
      role:"superadmin",
    });
    const user = {
        email: data.get('email'),
        first_name: data.get('firstName'),
        last_name: data.get('lastName'),
        password: data.get('password'),
        role:"superadmin",
      }
      handleOpen()
    CreateUser(user).then((res) => {
        handleClose()
        toast.success('You Are Registered Successfully  !', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
        navigation('/sign-in')
    }).catch((err) => {
        console.log(err)
        
    })
}
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const { vertical, horizontal } = state;
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  return (
    <>   
    <Navbar/>
    <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
  <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
  You Are Registered Successfully  !
  </Alert>
</Snackbar>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </Backdrop>

        <Box style={{position:"absolute",top:"11vh",left:"0",width:"50vw"}}>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <p className='welcome' >Join us today</p>
          <p className='welcomeText' style={{color:"rgba(231, 227, 252, 0.87)"}}>Enter your email and password to register</p>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
  InputProps={{
    style: {
      color: 'rgba(231, 227, 252, 0.87)', // Text color

    },
  }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={nameInputRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  InputProps={{
                    style: {
                      color: 'rgba(231, 227, 252, 0.87)', // Text color
                
                    },
                  }}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  InputProps={{
                    style: {
                      color: 'rgba(231, 227, 252, 0.87)', // Text color
                
                    },
                  }}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  InputProps={{
                    style: {
                      color: 'rgba(231, 227, 252, 0.87)', // Text color
                
                    },
                  }}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{backgroundColor:"rgb(145, 85, 253)"}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={signIn} style={{cursor:"pointer",color:"rgba(231, 227, 252, 0.87)"}} variant="body2" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </Box>
    <Box style={{position:"absolute",top:"0",left:"50vw",width:"50vw",height:"100%",overflow:"hidden"}}>
<Box className='middleBg2'></Box>
    </Box>
    </>
  );
}