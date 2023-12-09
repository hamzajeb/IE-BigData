import background from '../Assets/images/accueil1.png'
import img1 from './../Assets/images/image2.png'
import img2 from './../Assets/images/image3.png'
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
function Main() {
    useEffect(() => {
        // Animation for loop
      
    
        // Add more animations as needed
    
        return () => {
          // Clean up the animations if needed
        };
      }, []); 
  return (
    <>
    <Navbar/>
    <Box style={{position:"absolute",top:"0",left:"35vw",width:"65vw",height:"100%",overflow:"hidden"}}>
<Box className='middleBg22'></Box>
    </Box>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridRowGap: '100vh' ,position:"absolute",top:"0",left:"0",height:"100%"}}>
      <div style={{ gridColumn: 'span 2' }}>
        <div style={{marginTop:"32vh",textAlign:"left",marginLeft:"5vw"}}>
          <h1 className="titre" style={{color:"white"}}>
          Projet{' '}
            <span style={{ color: 'rgb(145, 85, 253)' ,textAlign:"left"}}>BI & BIG DATA</span>
          </h1>
          <br />
          <p className="p1" style={{color:"rgba(231, 227, 252, 0.87)"}}>
          La BI et le big data sont souvent utilisées ensemble pour analyser de grandes 
quantités de données et extraire des insights qui peuvent informer les 
décisions d'affaires.  
          </p>
          <br />
          <Button style={{ backgroundColor: 'rgb(145, 85, 253)',marginTop:"2vh" ,marginRight:"1vw"}} variant="contained">Plus</Button>
          <Button style={{ marginTop:"2vh" }} variant="outlined">Explore</Button>
        </div>
      </div>
      <div style={{ gridColumn: 'span 3', position: 'relative' ,marginTop:"3vh"}}  className="accueil">
        <img src={background} alt="Image1" className="image" />
        <img src={img1} alt="Image2" className="image2" />
        <img src={img2} alt="Image3" className="image3" />
      </div>
    </div>
          </>
  );
}

export default Main;
