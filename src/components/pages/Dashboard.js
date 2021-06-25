import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  welcomeWrap: {
    background: "#fcda3514",
    border: "1px solid #f1edde",
    minHeight: "100vh",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "1.2em",
    borderRadius: "25px",
  },
}));
const Dashboard = (props) => {
  const { user } = props;
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.welcomeWrap}>
        <Grid item={12}>
          <h1>
            Welcome
            <span style={{ color: "#3baa49" }}>
              {user.username
                ? ` ${user.first_name}  ${user.last_name}`
                : "John Smith"}
            </span>
          </h1>
        </Grid>
      </Grid>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.authState.user,
  };
};
export default connect(mapStateToProps, null)(Dashboard);
