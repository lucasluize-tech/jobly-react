import "./App.css";
import Routes from "./Routes.js";
import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import UserContext from "./userContext";
import jwt_decode from "jwt-decode";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [applicationIds, setApplicationIds] = useState([]); // maybe unique set?

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          JoblyApi.token = token;

          let currentUser = await JoblyApi.getUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(currentUser.applications);
        } catch (err) {
          console.error("problem loading user", err);
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [token]);

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error(errors);
      return { success: false, errors };
    }
  }

  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error(errors);
      return { success: false, errors };
    }
  }

  async function applyToJob(id) {
    await JoblyApi.apply(currentUser.username, id);
    setApplicationIds([...applicationIds, id]);
  }

  function hasAppliedToJob(id) {
    return applicationIds.includes(id);
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
            applyToJob,
            hasAppliedToJob,
            applicationIds,
          }}>
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
