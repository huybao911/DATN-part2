import React from "react";
import { styled } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { logOutUser } from "redux/actions/user";
import { StyledMenuItem } from '../../layouts/navigation/style'

import {  Favorite, Logout, Person, Approval, Notifications } from '@mui/icons-material';

import { purple } from '@mui/material/colors';

import { Stack, AppBar, Box, Toolbar, Typography, Popover, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import { Link, NavLink } from "react-router-dom";
const StyledRoot = styled(AppBar)(() => ({
  boxShadow: 'none',
  width: '100%',
  backgroundColor: 'white',
  fontWeight: 'bold',
}));

const Homepage: React.FC = (): JSX.Element => {

  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const openUser = Boolean(anchorElUser);
  const handleClickUser = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const user = useSelector((state: RootState) => state.user);

  const userHeader = user.isAuthenticated ? (
    <StyledRoot style={{ boxShadow: "none" }}>
      <Toolbar>
        <Link style={{ textDecoration: 'none' }} to={'/loginuser'}>
          <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
        </Link>
        <Typography align='left' sx={{ flexGrow: 1 }}></Typography>
        <div className="verticalLine">
        </div>
        <Box>
          <Button type='submit' href='' style={{ color: "white" }}>
            <Notifications />
          </Button>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
          sx={{ margin: 3, color: 'black' }}
        >
          <Box sx={{
            display: 'flex', alignItems: 'center', textAlign: 'center',
            '&.MuiButtonBase-root': {
              color: 'black'
            }
          }}>
            <Button size="large" onClick={(event) => handleClickUser(event)} >
              <Person />
            </Button>
            <Popover
              open={openUser}
              anchorEl={anchorElUser}
              onClose={handleCloseUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 1,
                  width: 220,
                  '& .MuiMenuItem-root': {
                    px: 1,
                    py: 1,
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '& .MuiTypography-root': {
                    fontSize: "15px",
                    color: "black"
                  },
                },
              }}
            >
              <StyledMenuItem component={NavLink} to={'/profile'} >
                <Avatar sx={{ bgcolor: purple[500] }}>{user.user.username.charAt(0).toUpperCase()}</Avatar>
                <Typography style={{ color: "black" }}>{user.user.username}</Typography>
              </StyledMenuItem>

              <Divider />

              <StyledMenuItem component={NavLink} to={'/storageEvent'}>
                <ListItemIcon>
                  <Favorite style={{ color: "red" }} fontSize="small" />
                </ListItemIcon>
                <Typography>Sự Kiện Đã Lưu</Typography>
              </StyledMenuItem>

              <StyledMenuItem component={NavLink} to={'/applyJob'}>
                <ListItemIcon>
                  <Approval style={{ color: "black" }} fontSize="small" />
                </ListItemIcon>
                <Typography>Sự Kiện Đã Ứng Tuyển</Typography>
              </StyledMenuItem>

              <MenuItem className="navbar-logout" onClick={(e) => dispatch(logOutUser())}>
                <ListItemIcon>
                  <Logout style={{ color: "red" }} fontSize="small" />
                </ListItemIcon >
                <Typography> Đăng Xuất</Typography>
              </MenuItem>

            </Popover>
          </Box>
        </Stack>
      </Toolbar>
    </StyledRoot>
  ) : null

  React.useEffect(() => {
    document.title = "TRANG CHỦ ";
  }, []);
  return (
    <>
      {userHeader}
    </>
  );
};

export default Homepage;
