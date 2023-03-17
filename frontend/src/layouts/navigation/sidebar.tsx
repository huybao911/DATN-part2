import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { logOutUser } from "redux/actions/user";
import { logOutSManager } from "redux/actions/sManager";
import { logOutManager } from "redux/actions/Manager";
import { logOutAdmin } from "redux/actions/admin";
import { RootState } from "redux/reducers";
import { Box, Drawer, Stack } from "@mui/material";
import NavSection from "./navSelection";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: "space-between",
    backgroundColor: "#222",
    zIndex: 2
  },
  title: {
    color: "#fff"
  },
  navLink: {
    textDecoration: 'none',
    color: 'black',
    fontFamily: "Roboto",
    padding: theme.spacing(1, 2)
  }
}));

const NAV_WIDTH = 230;

const SideBar: React.FC = (): JSX.Element => {
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
      ) : admin.isAuthenticated && admin.getRole.keyRole === "admin" ? (
        <NavLink exact to='/users' className={`${classes.navLink} nav-link`}>
          ADMIN
        </NavLink>
      ) : null;



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
  ) : null

  const sideBar = admin.isAuthenticated || smanager.isAuthenticated || manager.isAuthenticated ? (
    <> 
      <Box component="nav"
        sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}>
        <Drawer
          open
          variant='permanent'
          PaperProps={{
            sx: {
              width: 230,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}>
            
          <Box sx={{ px: 2.5, py: 6, display: 'inline-block', textAlign: 'center' }}>
            {topLinks}
          </Box>
          
          <NavSection/>

          <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
            <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
              <Box
                sx={{ width: 100, position: 'absolute', }}
              />
              <Box sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h6">
                  {bottomLinks}
                </Typography>
              </Box>
            </Stack>
          </Box>
          

        </Drawer>
      </Box>

    </>
  ) : null

  return (
    <>
    {sideBar}
    </>
  );
};

export default SideBar;