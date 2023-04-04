import React from "react";
import { styled } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { logOutUser } from "redux/actions/user";
import Content from "pages/contents/Content";

import { PersonAdd, Favorite, Logout, Person, Settings, Notifications } from '@mui/icons-material';

import { purple } from '@mui/material/colors';

import { Stack, AppBar, Box, Toolbar, Typography, Popover, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import { Link } from "react-router-dom";
import { IconButton } from "material-ui";

const StyledRoot = styled(AppBar)(() => ({
  boxShadow: 'none',
  width: '100%',
  backgroundColor: '#eeeeee',
  fontWeight: 'bold',
}));


const Homepage: React.FC = (): JSX.Element => {

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useSelector((state: RootState) => state.user);
  const bottomLinks = user.isAuthenticated ? (
    <StyledRoot style={{ boxShadow: "none" }}>
      <Toolbar>
        <Link style={{ textDecoration: 'none' }} to={'/loginuser'}>
          <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
        </Link>
        <Typography align='left' sx={{ flexGrow: 1 }}></Typography>
        <div className="verticalLine">
        </div>
        <Box>
          <Button type='submit' href='' style={{ color: "black" }}>
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
          sx={{ margin: 3 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Button size="large" style={{ color: "black" }} onClick={(event) => handleClick(event)} >
              <Person />
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 1,
                  width: 180,
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
              <Link style={{ textDecoration: 'none' }} to={'/loginuser'}>
                <MenuItem >
                  <Avatar sx={{ bgcolor: purple[500] }}>{user.user.username.charAt(0).toUpperCase()}</Avatar>
                  <Typography style={{ color: "black" }}>{user.user.username}</Typography>
                </MenuItem>
              </Link>
              <Divider />
              <Link style={{ textDecoration: 'none' }} to={'/storagePost'}>
                <MenuItem>
                  <ListItemIcon>
                    <Favorite style={{ color: "red" }} fontSize="small" />
                  </ListItemIcon>
                  <Typography>Bài Viết Đã Lưu</Typography>
                </MenuItem>
              </Link>
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
  ) : (<StyledRoot style={{ boxShadow: "none" }} >
    <Toolbar>
      <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
      <Typography align='left' sx={{ flexGrow: 1 }}></Typography>
      <Stack
        direction="row"
        alignItems="center"
        spacing={{
          xs: 0.5,
          sm: 1,
        }}
        sx={{ margin: 3 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Button size="large" style={{ color: "black" }} onClick={(event) => handleClick(event)} >
            <Person />
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 180,
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
                },
              },
            }}
          >
            <Link style={{ textDecoration: 'none' }} to={'/loginuser'}>
              <MenuItem >
                <Avatar>G</Avatar>
                <Typography style={{ color: "black" }}>Tài Khoản</Typography>
              </MenuItem>
            </Link>
            <Divider />
            <Link style={{ textDecoration: 'none' }} to={'/register'}>
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                <Typography style={{ color: "black" }}>Đăng Ký</Typography>
              </MenuItem>
            </Link>
          </Popover>
        </Box>
      </Stack>
    </Toolbar>
  </StyledRoot>)

  React.useEffect(() => {
    document.title = "TRANG CHỦ ";
  }, []);
  return (
    <>
      {bottomLinks}
      <Content />

    </>
  );
};

export default Homepage;
