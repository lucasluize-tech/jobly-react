import { Switch, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import CompanyList from "./components/CompanyList.js";
import CompanyJobs from "./components/CompanyJobs.js";
import JobsList from "./components/JobsList.js";
import Profile from "./components/Profile.js";
import AuthRoute from "./AuthRoute";

export default function Router({ login, signup }) {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/signup'>
          <Signup signup={signup} />
        </Route>
        <Route exact path='/login'>
          <Login login={login} />
        </Route>
        <AuthRoute exact path='/companies/:handle'>
          <CompanyJobs />
        </AuthRoute>
        <AuthRoute exact path='/companies'>
          <CompanyList />
        </AuthRoute>
        <AuthRoute exact path='/jobs'>
          <JobsList />
        </AuthRoute>
        <AuthRoute exact path='/profile'>
          <Profile />
        </AuthRoute>
        <Route exact path='*'>
          <h1>404 Ops! There's nothing here</h1>
        </Route>
      </Switch>
    </div>
  );
}
