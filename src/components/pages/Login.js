import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { LoginAuthAction } from "../../redux/actions/authAction";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../FormsUI/TextFeild";
import SubmitButton from "../FormsUI/Button";
import MuiAlert from "@material-ui/lab/Alert";
import isAuthenticated from "../../redux/isAuthenticated";

// styles
const useStyles = makeStyles((theme) => ({
  loginWrap: {
    minHeight: "calc(100vh - 100px)",
    background: "#efefef",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "50px 0",
  },
  loginBg: {
    background: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
  },
  formInner: {
    padding: theme.spacing(7, 12),
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(5),
    },
  },
  innerBg: {
    background:
      "linear-gradient(to bottom, #37cf49, #2fba3f, #27a535, #1f902b, #177c22)",
    justifyContent: "center",
    color: "#fff",
    padding: theme.spacing(7, 6),
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4, 5),
    },
  },
  submitBtn: {
    borderRadius: theme.spacing(8),
    color: "#fff",
    padding: theme.spacing(1.5, 7),
    width: "170px",
  },
  openBtn: {
    borderRadius: theme.spacing(8),
    color: "#fff",
    padding: theme.spacing(1.3, 5),
    border: "2px solid #fff",
    marginTop: 10,
  },
  progressIcon: {
    color: "#fff",
  },
}));

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};
const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("No password provided."),
});
const Login = (props) => {
  const { login, loading, username } = props;
  const [errorHandler, setErrorHandler] = useState({
    message: "",
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  const history = useHistory();

  const isauth = isAuthenticated();
  const checkToken = () => {
    return isauth ? history.push("/") : undefined;
  };
  checkToken();

  const submitForm = (values) => {
    console.log(values);
    login(values, history, setErrorHandler, handleClick);
  };

  return (
    <section className={classes.loginWrap}>
      <Container>
        <Grid container justify="center">
          <Grid container item sm={9} className={classes.loginBg}>
            <Grid
              item
              sm={7}
              container
              justify="center"
              className={classes.formInner}
            >
              <Typography
                variant="h3"
                color="primary"
                style={{ marginBottom: "20px" }}
              >
                Sign in to {username ? username : "your account"}
              </Typography>
              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE,
                }}
                validationSchema={FORM_VALIDATION}
                onSubmit={submitForm}
              >
                <Form style={{ width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Textfield name="username" label="Username" />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield name="password" label="Password" />
                    </Grid>
                    <Grid item xs={12}>
                      <SubmitButton className={classes.submitBtn}>
                        {loading ? (
                          <CircularProgress
                            size={25}
                            className={classes.progressIcon}
                          />
                        ) : (
                          "SIGN IN"
                        )}
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
            <Grid
              item
              sm={5}
              container
              direction="column"
              alignItems="center"
              className={(classes.formInner, classes.innerBg)}
            >
              <Typography variant="h3" style={{ marginBottom: "15px" }}>
                Hello Friend
              </Typography>
              <Typography variant="subtitle1">
                Enter Your personal details and start journey with us
              </Typography>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                className={classes.openBtn}
              >
                SIGN UP
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {errorHandler.message}
          </Alert>
        </Snackbar>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.authState.loading,
    username: state.authState.user.username,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (user, history, setErrorHandler, handleClick) => {
      // dispatch()
      console.log(user);
      dispatch(LoginAuthAction(user, history, setErrorHandler, handleClick));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
