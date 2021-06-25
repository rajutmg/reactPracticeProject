import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#6EC177",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  navigationLogo: {
    width: "50%",
    cursor: "pointer",
  },
  navigationLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(6),
  },
  navigationDrawer: {
    width: 240,
    border: "none",
    whiteSpace: "nowrap",
    overflowX: "hidden",
    position: "relative",
    height: "100vh",
  },
  navigationDrawerCollapse: {
    width: theme.spacing(9),
  },
  navigationToolBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: theme.spacing(1),
    ...theme.mixins.toolbar,
  },
  navigationToolbarCollapse: {
    justifyContent: "center",
    paddingRight: 0,
  },
  menuItemIcon: {
    width: "100%",
  },
  navigationList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  navigationSpacer: {
    flex: 1,
  },
  menuItem: {
    width: "80%",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  menuItemActive: {
    backgroundColor: "#EBEBEC",
  },
}));
