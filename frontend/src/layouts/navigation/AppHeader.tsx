import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { logOutUser } from "redux/actions/user";
import { logOutSManager } from "redux/actions/sManager";
import { logOutManager } from "redux/actions/Manager";
import { logOutAdmin } from "redux/actions/admin";
import { RootState } from "redux/reducers";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#222",
    zIndex: 2
  },
  title: {
    color: "#fff"
  },
  navLink: {
    textDecoration: 'none',
    color: '#f4f4f4',
    fontFamily: "Roboto",
    padding: theme.spacing(1, 2)
  }
}));

const AppHeader: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const smanager = useSelector((state: RootState) => state.smanager);
  const manager = useSelector((state: RootState) => state.manager);
  const admin = useSelector((state: RootState) => state.admin);


  

  const topLinks =
    user.isAuthenticated && user.getRole.keyRole === "user" ? (
      <NavLink exact to='/dashboard' className={`${classes.navLink} nav-link`}>
        NGƯỜI DÙNG
      </NavLink>
    ) : manager.isAuthenticated && manager.getRole.keyRole === "manager" ? (
      <NavLink exact to='/manager' className={`${classes.navLink} nav-link`}>
        QUẢN LÝ
      </NavLink>
    )
    : smanager.isAuthenticated && smanager.getRole.keyRole === "smanager" ? (
      <NavLink exact to='/smanager' className={`${classes.navLink} nav-link`}>
        QUẢN LÝ CẤP CAO
      </NavLink>
    ): admin.isAuthenticated && admin.getRole.keyRole === "admin" ? (
      <NavLink exact to='/users' className={`${classes.navLink} nav-link`}>
        ADMIN
      </NavLink>

      
    ) :null;

  const bottomLinks = user.isAuthenticated ? (
    <NavLink exact to='#' className={`${classes.navLink} nav-link`} onClick={(e) => dispatch(logOutUser())}>
      Đăng xuất
    </NavLink>
  ) : admin.isAuthenticated ? (
    <NavLink exact to='#' className={`${classes.navLink} nav-link`} onClick={(e) => dispatch(logOutAdmin())}>
      Đăng xuất
    </NavLink>
  ) : smanager.isAuthenticated ? (
    <NavLink exact to='#' className={`${classes.navLink} nav-link`} onClick={(e) => dispatch(logOutSManager())}>
      Đăng xuất
    </NavLink>
  ) : manager.isAuthenticated ? (
    <NavLink exact to='#' className={`${classes.navLink} nav-link`} onClick={(e) => dispatch(logOutManager())}>
      Đăng xuất
    </NavLink>


  ):(
    <>
      <NavLink exact to='/register' className={`${classes.navLink} nav-link`}>
        Đăng Ký
      </NavLink>
      <NavLink exact to='/' className={`${classes.navLink} nav-link`}>
        Đăng Nhập
      </NavLink>
    </>
  );

  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant='h6' noWrap className={classes.title}>
        DEMO
      </Typography>
      <div>{topLinks}</div>
      <div>{bottomLinks}</div>
    </Toolbar>
  );
};

export default AppHeader;
