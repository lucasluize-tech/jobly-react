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
  const [isLoggedin, setIsLoggedin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  function applyToJob(id) {
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
          setIsLoggedin(true);
          setLoading(false);
        } catch (err) {
          console.error("problem loading user", err);
          setCurrentUser(null);
        }
      }
      setLoading(true);
      getCurrentUser();
    }
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
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, applyToJob, hasAppliedToJob }}>
          <NavBar isLoggedin={isLoggedin} logout={logout} />
          <Routes isLoggedin={isLoggedin} login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
