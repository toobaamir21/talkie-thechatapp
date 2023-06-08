import React from 'react'
import './style.css'
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Welcome = () => {
  return (
    <>
      <div className="main">
        <div className="welcome">
          <p className="talkie"> Welcome to Talkie!</p>
          <p className='desc'>Let's chat with your friends, family and colleagues on this Talkie. Click the below button and register yourself rightaway!</p>
          <div className="register">
            <Button className="btn" backgroundColor={"blue"} color={"white"}>
              <Link to="/registration">Registration</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome
