import CountUp from 'react-countup';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useRef ,useState} from 'react';
import { styled,useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Avatar from '@mui/material/Avatar';
import GridViewIcon from '@mui/icons-material/GridView';
import MenuItem from '@mui/material/MenuItem';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import PublishIcon from '@mui/icons-material/Publish';
import FeedIcon from '@mui/icons-material/Feed';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import Menu from '@mui/material/Menu';
import GroupsIcon from '@mui/icons-material/Groups';
import { GetItems } from '../Utils/AuthRequest';
import { Outlet, useNavigate } from 'react-router-dom'
import MailIcon from '@mui/icons-material/Mail';
import Cookies from 'js-cookie'
import SettingsIcon from '@mui/icons-material/Settings';
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
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
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MuiAlert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CreateUser } from '../Utils/AuthRequest';
import Navbar from '../components/Navbar';
import { getStaics } from '../Utils/DashboardRequest';
export default function Dashboard(){
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Statiques', 'Graphes', 'Articles', 'Map'].map((text, index) => (
          <>
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <QueryStatsIcon style={{color:"rgb(145, 85, 253)",fontWeight:"bold"}}/> }
                {index === 1 && <EqualizerIcon style={{color:"rgb(145, 85, 253)",fontWeight:"bold"}}/> }
                {index === 2 && <FeedIcon style={{color:"rgb(145, 85, 253)",fontWeight:"bold"}}/> }
                {index === 3 && <LocationOnIcon style={{color:"rgb(145, 85, 253)",fontWeight:"bold"}}/> }
              </ListItemIcon>
              <ListItemText primary={text} style={{color:"rgb(145, 85, 253)",fontWeight:"bold"}} />
            </ListItemButton>
          </ListItem>
          <Divider/>
          </>
        ))}
      </List>

    </Box>
  );
  const navigation = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

function RandomText() {
  var text = ["blockchain", "2023", "2022", "cryptography", "bitcoin", "2019"];
  const letter = text[Math.floor(Math.random() * text.length)];
  return letter;
}
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));




function Rain(cloudClass) {

  let cloud = document.querySelector(cloudClass);
  if (cloud) {
  let e = document.createElement('div');
  let left = Math.floor(Math.random() * 160);
  let size = Math.random() * 1.5;
  let duration = Math.random() * 6;
  e.classList.add('text');
  cloud.appendChild(e);
  e.innerText = RandomText();
  e.style.left = left + 'px';
  e.style.fontSize = 0.5 + size + 'em';
  e.style.animationDuration = 1 + duration + 's';
  setTimeout(function () {
    cloud.removeChild(e);
  }, 7500);
}
}
          React.useEffect(() => {
            setInterval(function () {
              Rain('.cloud');
            }, 1100);
            setInterval(function () {
              Rain('.cloud2');
            }, 1000);
            setInterval(function () {
              Rain('.cloud3');
            }, 900);
          }, []);
          const accueil = () => {
            setAnchorEl(null);
            navigation(`/`)
          };
          const dashboard = () => {
            setAnchorEl(null);
            navigation(`/dashboard`)
          };
          const handleClose = () => {
            setAnchorEl(null);
          };
          const logout = () => {
            setAnchorEl(null);
            Cookies.remove('tokenBigData');
            Cookies.remove('email');
            navigation(`/`)
          };
          const [openLoader, setOpenLoader] = React.useState(false);
          const handleCloseLoader = () => {
            setOpenLoader(false);
          };
          const handleOpenLoader = () => {
            setOpenLoader(true);
          };
          const[data,setData]=React.useState({})
          
          useEffect(() => {
            
            getData1()

          }, []);

          async function getData1() {
            handleOpenLoader()
            await getStaics().then((res) => {
              setData(res.data)
              handleCloseLoader()
            })
            
          }
return(
  <>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoader}
        onClick={handleCloseLoader}
      >
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      </Backdrop>
        <React.Fragment >
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
  <div className='body1'>
    <div style={{borderBottom:"1px solid rgb(145, 85, 253)",padding:"1.5vh 2vw",display:"flex",justifyContent:"space-between"}}>
    <p
          className='title' style={{display:"flex",alignItems:"center"}}
          >
            <GridViewIcon onClick={toggleDrawer("left", true)}  sx={{ fontSize: 30,color:"rgb(145, 85, 253)",marginRight:"1vw",cursor:"pointer" }} />
           <span style={{color:"rgba(231, 227, 252, 0.87)"}}>Blockchain</span> 
          </p>
          <div style={{display:"flex",alignItems:"center"}}>
          
          <SettingsIcon style={{marginRight:"2vw",color:"rgba(231, 227, 252, 0.87)"}}/>
          <TranslateIcon style={{marginRight:"2vw",color:"rgba(231, 227, 252, 0.87)"}}/>
          <SearchIcon style={{marginRight:"2vw",color:"rgba(231, 227, 252, 0.87)"}}/>
          <Badge color="error"  badgeContent={100} style={{marginRight:"2vw"}}>
         
  <NotificationsNoneIcon style={{color:"rgba(231, 227, 252, 0.87)"}}/>
</Badge>
          <Badge style={{marginRight:"2vw"}} badgeContent={4} color="secondary">
        <MailIcon color="action" style={{color:"rgba(231, 227, 252, 0.87)"}}/>
      </Badge>
          <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" style={{cursor:"pointer"}} onClick={handleMenu}/>
        
      </StyledBadge>
      </div>
      <Menu
                
                anchorEl={anchorEl}
                style={{top:"5vh",right:"0",left:"90%"}}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={accueil}>Accueil</MenuItem>
                <MenuItem onClick={dashboard}>Dashboard</MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>
    </div>


    <div style={{display:"flex",flexDirection:"row"}}>
  <div className='container1' style={{transform: "scale(0.5)"}}>
  
    <div className='cloud' >
      <h1 style={{position:"absolute",color:"#312D4B",top:"30%",left:"50%",transform:"translate(-50%,-50%)",zIndex:"100",fontFamily:'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'}}>ACM</h1>
    </div>
  </div>
  <div className='container3' style={{transform: "scale(0.5)"}}>
  
  <div className='cloud3' >
    <h1 style={{position:"absolute",color:"#312D4B",top:"30%",left:"50%",transform:"translate(-50%,-50%)",zIndex:"100",fontFamily:'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'}}>IEEE</h1>
  </div>
</div>
  <div className='container2' style={{transform: "scale(0.5)"}}>
  
  <div className='cloud2' >
    <h1 style={{position:"absolute",color:"#312D4B",top:"30%",left:"50%",transform:"translate(-50%,-50%)",zIndex:"100",fontFamily:'Inter,sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'}}>Science direct</h1>
  </div>
</div>

</div>
<div style={{display:"flex",flexDirection:"column"}}>
<div style={{padding:"0 5vw 5vh",flex:"1 1 1 1",display:"flex",flexDirection:"row"}}>
<div style={{border:"2px solid rgb(145, 85, 253)",width:"21.5vw",marginRight:"1.33vw",padding:"2vh 1vw",display:"flex",flexDirection:"row",alignItems:"center"}}>
<GridViewIcon   sx={{ fontSize: 30,color:"rgb(145, 85, 253)",marginRight:"2vw" }} />
  <div style={{textAlign:"left"}}>
  <p style={{color:"rgba(231, 227, 252, 0.6)",fontWeight: "800",}}>Nombre d'articles </p>
  <CountUp end={data.articles} style={{fontSize: "xxx-large",fontWeight: "200",color: "rgba(231, 227, 252, 0.87)"}} duration={15}/>
  </div>
</div>
<div style={{border:"2px solid rgb(145, 85, 253)",width:"21.5vw",marginRight:"1.33vw",padding:"2vh 1vw",display:"flex",flexDirection:"row",alignItems:"center"}}>
<FeedIcon   sx={{ fontSize: 30,color:"rgb(86, 202, 0)",marginRight:"2vw" }} />
  <div style={{textAlign:"left"}}>
<p style={{color:"rgba(231, 227, 252, 0.6)",fontWeight: "800"}}>Nombre de journaux </p>
<CountUp end={data.journals} style={{fontSize: "xxx-large",fontWeight: "200",color: "rgba(231, 227, 252, 0.87)"}} duration={15}/>
</div>
</div>
<div style={{border:"2px solid rgb(145, 85, 253)",width:"21.5vw",marginRight:"1.33vw",padding:"2vh 1vw",display:"flex",flexDirection:"row",alignItems:"center"}}>
<GroupsIcon   sx={{ fontSize: 30,color:"rgb(22, 177, 255)",marginRight:"2vw" }} />
  <div style={{textAlign:"left"}}>
<p style={{color:"rgba(231, 227, 252, 0.6)",fontWeight: "800"}}>Nombre  d'auteurs </p>
<CountUp end={data.auteurs} style={{fontSize: "xxx-large",fontWeight: "200",color: "rgba(231, 227, 252, 0.87)"}} duration={15}/>
</div>
</div>
<div style={{border:"2px solid rgb(145, 85, 253)",width:"21.5vw",padding:"2vh 1vw",display:"flex",flexDirection:"row",alignItems:"center"}}>
<PublishIcon   sx={{ fontSize: 30,color:"rgb(255, 180, 0)",marginRight:"2vw" }} />
  <div style={{textAlign:"left"}}>
<p style={{color:"rgba(231, 227, 252, 0.6)",fontWeight: "800"}}>Nombre d'editurs </p>
<CountUp end={data.publisher} style={{fontSize: "xxx-large",fontWeight: "200",color: "rgba(231, 227, 252, 0.87)"}} duration={15}/>
</div>
</div>
</div>

<div style={{padding:"0 5vw",flex:"1 1 1 1",display:"flex",flexDirection:"row"}}>
<div style={{border:"2px solid rgb(145, 85, 253)",width:"21.5vw",marginRight:"1.33vw",padding:"2vh 1vw",display:"flex",flexDirection:"row",alignItems:"center"}}>
<h1 style={{color:"white",marginRight:"2vw" }}>Q1</h1>
  <div style={{textAlign:"left"}}>
  <p style={{color:"rgba(231, 227, 252, 0.6)",fontWeight: "800",}}>Nombre de journaux (Q1) </p>
  <CountUp end={data.Q1} style={{fontSize: "xxx-large",fontWeight: "200",color: "rgba(231, 227, 252, 0.87)"}} duration={15}/>
  </div>
</div>
<div style={{border:"2px solid rgb(145, 85, 253)",width:"21.5vw",marginRight:"1.33vw",padding:"2vh 1vw",display:"flex",flexDirection:"row",alignItems:"center"}}>
<h1 style={{color:"white",marginRight:"2vw" }}>Q2</h1>
  <div style={{textAlign:"left"}}>
<p style={{color:"rgba(231, 227, 252, 0.6)",fontWeight: "800"}}>Nombre de journaux (Q2)</p>
<CountUp end={data.Q2} style={{fontSize: "xxx-large",fontWeight: "200",color: "rgba(231, 227, 252, 0.87)"}} duration={15}/>
</div>
</div>
<div style={{border:"2px solid rgb(145, 85, 253)",width:"21.5vw",marginRight:"1.33vw",padding:"2vh 1vw",display:"flex",flexDirection:"row",alignItems:"center"}}>
<h1 style={{color:"white",marginRight:"2vw" }}>Q3</h1>
  <div style={{textAlign:"left"}}>
<p style={{color:"rgba(231, 227, 252, 0.6)",fontWeight: "800"}}>Nombre  de journaux (Q3)</p>
<CountUp end={data.Q3} style={{fontSize: "xxx-large",fontWeight: "200",color: "rgba(231, 227, 252, 0.87)"}} duration={15}/>
</div>
</div>
<div style={{border:"2px solid rgb(145, 85, 253)",width:"21.5vw",padding:"2vh 1vw",display:"flex",flexDirection:"row",alignItems:"center"}}>
<h1 style={{color:"white",marginRight:"2vw" }}>Q4</h1>
  <div style={{textAlign:"left"}}>
<p style={{color:"rgba(231, 227, 252, 0.6)",fontWeight: "800"}}>Nombre de journaux (Q4)</p>
<CountUp end={data.Q4} style={{fontSize: "xxx-large",fontWeight: "200",color: "rgba(231, 227, 252, 0.87)"}} duration={15}/>
</div>
</div>

</div>
  </div>
  </div>
  </>
)
}
