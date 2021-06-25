import React, { useEffect } from "react";
// internal
import "./App.css";
import store from "./redux/store";
import theme from "./components/Theme";
import { protected_route, routes } from "./components/menu/routes/routes";
import PrivateRoute from "./components/menu/routes/PrivateRoute";
import Navigation from "./components/menu/Navigation";

// external
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Provider } from "react-redux";
// material ui
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core";
// styles
const useStyles = makeStyles((theme) => ({
  appRoot: {
    display: "flex",
  },
  appBarSpacer: {
    [theme.breakpoints.down("xs")]: {
      ...theme.mixins.toolbar,
    },
  },
  main_container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
}));

function App() {
  const classes = useStyles();
  let matchLogin = useRouteMatch("/login");
  let matchRegister = useRouteMatch("/register");

  const checkPath = () => {
    if (matchLogin || matchRegister) {
      return;
    } else {
      return <Navigation />;
    }
  };
  useEffect(() => {
    checkPath();
  }, []);
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div
            className={
              matchLogin || matchRegister ? undefined : classes.appRoot
            }
          >
            {checkPath()}
            <div className={classes.main_container}>
              <div
                className={
                  matchLogin || matchRegister ? undefined : classes.appBarSpacer
                }
              />
              <Switch>
                {routes.map((route, index) => {
                  return (
                    <Route
                      exact
                      key={index}
                      path={route.path}
                      component={route.component}
                    ></Route>
                  );
                })}
                {protected_route.map((route, index) => {
                  return (
                    <PrivateRoute
                      exact
                      key={index}
                      path={route.path}
                      component={route.component}
                    />
                  );
                })}
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
