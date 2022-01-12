import "./App.css";
import Routes from "./Routes.js";
import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set());

  const UserContext = React.createContext();

  function applyToJob(id) {
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  // useEffect(() => {
  //   async function getCurrentUser() {
  //     if (token) {
  //       try {
  //         // let { username } = jwt.decode(token);
  //         // put the token on the Api class so it can use it to call the API.
  //         JoblyApi.token = token;
  //         let currentUser = await JoblyApi.getCurrentUser(username);
  //         setCurrentUser(currentUser);
  //         setApplicationIds(new Set(currentUser.applications));
  //       } catch (err) {
  //         console.error("App loadUserInfo: problem loading", err);
  //         setCurrentUser(null);
  //       }
  //     }
  //     getCurrentUser();
  //   }
  // }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar isLoggedin={isLoggedin} currentUser={currentUser} />
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, applyToJob, hasAppliedToJob }}>
          <Routes isLoggedin={isLoggedin} currentUser={currentUser} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
