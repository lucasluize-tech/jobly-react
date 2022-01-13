import { Switch, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import CompanyList from "./components/CompanyList.js";
import CompanyJobs from "./components/CompanyJobs.js";
import JobsList from "./components/JobsList.js";

export default function Router({ isLoggedin, login, signup }) {
  // let's just create a placeholder for now to test when user is logged in.
  const { currentUser } = { currentUser: { username: "lucas" } };
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home isLoggedin={isLoggedin} currentUser={currentUser} />
        </Route>
        <Route exact path='/signup'>
          <Signup signup={signup} />
        </Route>
        <Route exact path='/login'>
          <Login login={login} />
        </Route>
        <Route exact path='/companies/:handle'>
          <CompanyJobs />
        </Route>
        <Route exact path='/companies'>
          <CompanyList />
        </Route>
        <Route exact path='/jobs'>
          <JobsList />
        </Route>
        <Route exact path='/profile'>
          Profile
        </Route>
        <Route exact path='*'>
          <h1>404 Ops! There's nothing here</h1>
        </Route>
      </Switch>
    </div>
  );
}
