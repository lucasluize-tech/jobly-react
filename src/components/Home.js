import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import UserContext from "../userContext";

function Home() {
  // placeHolder just to play around
  // const { currentUser } = { currentUser: { username: "Lucas" } };
  const { currentUser } = useContext(UserContext);

  return (
    <div className='wrapper'>
      <div className='row align-items-center justify-content-center'>
        <h1>Jobly</h1>
        <p className='my-4'>All the jobs, in one convenient place.</p>
        {currentUser ? (
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
