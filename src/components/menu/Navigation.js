import React, { useState } from "react";
// internal
import MenuItem from "./MenuItem";
import { useStyles } from "./Styles";
import DashboardIcon from "../../assets/DashboardIcon.svg";
import DashboardIconActive from "../../assets/DashboardIconActive.svg";
import TransactionsIcon from "../../assets/TransactionsIcon.svg";
import TransactionsIconActive from "../../assets/TransactionsIconActive.svg";
import SecureIcon from "../../assets/SecureIcon.svg";
import SecureIconActive from "../../assets/SecureIconActive.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import SettingsIconActive from "../../assets/SettingsIconActive.svg";
import SignOutIcon from "../../assets/SignOutIcon.svg";
import AccountsIcon from "../../assets/AccountsIcon.svg";
import AccountsIconActive from "../../assets/AccountsIconActive.svg";
// external
import clsx from "clsx";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
// assets
import Logo1 from "../../assets/logo1.svg";
import Logo2 from "../../assets/logo2.svg";

// material ui
import {
  List,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import { LogOutAuthAction } from "../../redux/actions/authAction";

const dash_item = [
  {
    label: "Dashboard",
    path: "/",
    icon: DashboardIcon,
    activeIcon: DashboardIconActive,
  },
  {
    label: "Accounts",
    path: "/accounts",
    icon: AccountsIcon,
    activeIcon: AccountsIconActive,
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: TransactionsIcon,
    activeIcon: TransactionsIconActive,
  },
  {
    label: "Secure",
    path: "/secure",
    icon: SecureIcon,
    activeIcon: SecureIconActive,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIconActive,
  },
];
const dash_item_logOut = [
  {
    label: "Sign Out",
    icon: SignOutIcon,
    activeIcon: SignOutIcon,
  },
];

const Navigation = (props) => {
  const { logOut } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  const history = useHistory();

  const toggleNavigation = () => {
    setOpen(!open);
    console.log("yes");
  };

  const closeNavigation = () => {
    if (matches) {
      setOpen(false);
    }
  };

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            onClick={toggleNavigation}
            edge="start"
            color="inherit"
            arial-labe="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" variant="h6">
            Quality
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={matches ? "temporary" : "permanent"}
        open={matches ? !open : open}
        classes={{
          paper: clsx(
            classes.navigationDrawer,
            !open && classes.navigationDrawerCollapse
          ),
        }}
      >
        <div
          className={clsx(
            classes.navigationToolBar,
            !open && classes.navigationToolbarCollapse
          )}
        >
          <IconButton onClick={toggleNavigation}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <div className={classes.navigationLogoContainer}>
          <img
            src={open ? Logo1 : Logo2}
            alt="Quality logo"
            className={classes.navigationLogo}
          />
        </div>
        <List className={classes.navigationList}>
          {dash_item.map((route, index) => {
            return (
              <>
                <MenuItem
                  key={index}
                  label={route.label}
                  icon={route.icon}
                  activeIcon={route.activeIcon}
                  path={route.path}
                  onClick={() => {
                    closeNavigation();
                  }}
                />
              </>
            );
          })}
          {dash_item_logOut.map((route, index) => {
            return (
              <>
                {route.label === "Sign Out" && (
                  <div className={classes.navigationSpacer}></div>
                )}
                <MenuItem
                  key={index}
                  label={route.label}
                  icon={route.icon}
                  activeIcon={route.activeIcon}
                  path={route.path}
                  onClick={() => {
                    logOut(history);
                  }}
                />
              </>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (history) => {
      dispatch(LogOutAuthAction(history));
    },
  };
};
export default connect(null, mapDispatchToProps)(Navigation);
