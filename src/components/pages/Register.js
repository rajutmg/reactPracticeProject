import React from "react";

// internal
import Textfield from "../FormsUI/TextFeild";
import SubmitButton from "../FormsUI/Button";
import isAuthenticated from "../../redux/isAuthenticated";
import { RegisterAuthAction } from "../../redux/actions/authAction";

// external
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// material ui
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";

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

// initial form state
const INITIAL_FORM_STATE = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};
// client side validation
const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Required"),
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Register = (props) => {
  const { register, loading } = props;
  const classes = useStyles();
  const history = useHistory();

  // cheking local storage token
  const isauth = isAuthenticated();
  const checkToken = () => {
    return isauth ? history.push("/") : undefined;
  };
  checkToken();

  // form submitting
  const submitForm = (values, { setErrors }) => {
    console.log(values);
    register(values, history, { setErrors });
  };

  return (
    <section className={classes.loginWrap}>
      <Container>
        <Grid container justify="center">
          <Grid container item sm={9} className={classes.loginBg}>
            <Grid
              item
              sm={5}
              container
              direction="column"
              alignItems="center"
              className={(classes.formInner, classes.innerBg)}
            >
              <Typography variant="h3" style={{ marginBottom: "15px" }}>
                Welcome Back !
              </Typography>
              <Typography variant="subtitle1">
                To keep Connected With us please login with personal info
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                className={classes.openBtn}
              >
                SIGN IN
              </Button>
            </Grid>
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
                Sign into your account
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
                      <Textfield name="first_name" label="First name" />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield name="last_name" label="Last name" />
                    </Grid>
                    <Grid item xs={12}>
                      <Textfield name="email" label="Email" />
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
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

// conneting and getting state from redux
const mapStateToProps = (state) => {
  return {
    loading: state.authState.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    register: (user, history, { setErrors }) => {
      // dispatch()
      console.log(user);
      dispatch(RegisterAuthAction(user, history, { setErrors }));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
