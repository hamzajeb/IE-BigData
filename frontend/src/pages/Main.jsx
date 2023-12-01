import background from '../Assets/images/background1.jpg'
import img1 from '../Assets/images/1.png'
import img2 from '../Assets/images/2.png'
import img3 from '../Assets/images/3.png'
import img4 from '../Assets/images/4.png'
import img5 from '../Assets/images/5.png'
import anime from 'animejs';
import React, { useEffect } from 'react';
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
    <div className="Main" >
        <img src={background} className='background' alt='Search Illustration' />
        {/* <div className='child'></div> */}
    </div>
    <div className='child'>

    </div>

          </>
  );
}

export default Main;
