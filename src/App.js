import "./App.css";
import Routes from "./Routes.js";
import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import UserContext from "./userContext";
import jwt_decode from "jwt-decode";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("jobly_token");
  const [applicationIds, setApplicationIds] = useState([]);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          JoblyApi.token = token;

          let currentUser = await JoblyApi.getUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(currentUser.applications);
          console.log("now curreUser is active");
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
    setApplicationIds([]);
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

  async function removeJob(id) {
    await JoblyApi.removeJob(currentUser.username, id);
    const removed = applicationIds.filter((v) => v !== id);
    setApplicationIds(removed);
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
            removeJob,
          }}>
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
