import React, { useContext } from "react";
import UserContext from "./userContext.js";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Redirect to='/login' />;
  } else {
    return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
    );
  }
}

export default AuthRoute;
