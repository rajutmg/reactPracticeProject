import React, { useEffect, useState } from "react";
// internal
import { useStyles } from "./Styles";
// external
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
// material ui
import {
  ListItemIcon,
  ListItem,
  ListItemText,
  Icon,
  Button,
} from "@material-ui/core";

const MenuItem = ({ label, icon, activeIcon, path, onClick }) => {
  const classes = useStyles();
  const [active, setActive] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (path === "/sign-out") {
      setActive(true);
      return;
    }
    setActive(location.pathname === path);
  }, [location]);
  return (
    <ListItem
      button
      component={Link}
      to={path}
      className={clsx(classes.menuItem, active && classes.menuItemActive)}
      onClick={onClick}
    >
      <ListItemIcon>
        <Icon>
          <img
            src={active ? activeIcon : icon}
            className={classes.menuItemIcon}
            alt={label}
          />
        </Icon>
      </ListItemIcon>
      <ListItemText
        primary={label}
        // primaryTyopgraghyProps={{ variant: "body2" }}
      ></ListItemText>
    </ListItem>
  );
};

export default MenuItem;
