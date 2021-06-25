import React from "react";
import { Redirect, Route } from "react-router-dom";
import isAuthenticated from "../../../redux/isAuthenticated";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isauth = isAuthenticated();

  return isauth ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
