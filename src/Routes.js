import { Switch, Route } from "react-router-dom";
import Home from "./components/Home.js";

export default function Router({ isLoggedin, currentUser }) {
  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home isLoggedin={isLoggedin} currentUser={currentUser} />
        </Route>
        <Route exact path='/signup'>
          SignUp
        </Route>
        <Route exact path='/login'>
          Login
        </Route>
        <Route exact path='/companies/:handle'>
          {/* <Company handle={handle} /> */}
          company
        </Route>
        <Route exact path='/companies'>
          companiesList
        </Route>
        <Route exact path='/jobs'>
          JobsList
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
