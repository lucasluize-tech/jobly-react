import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "reactstrap";

function Home({ isLoggedin, currentUser }) {
  return (
    <div className='wrapper'>
      <div className='row align-items-center justify-content-center'>
        <h1>Jobly</h1>
        <p className='my-4'>All the jobs, in one convenient place.</p>
        {isLoggedin ? (
          <div>
            <b>Welcome Back {currentUser.username}</b>
          </div>
        ) : (
          <div className='lading-buttons d-flex justify-content-center gap-3'>
            <Button color='primary' size='md'>
              <Link to='/signup' className='buttonFront'>
                SignUp
              </Link>
            </Button>

            <Button color='primary' size='md'>
              <Link to='/login' className='buttonFront'>
                Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
