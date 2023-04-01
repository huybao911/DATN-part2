import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { logOutUser } from "redux/actions/user";
import Content from "pages/contents/content";



import { Stack, AppBar, Box, Toolbar } from '@mui/material';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    minHeight: "100vh",
  },
  btnRegister: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },
  navLink: {
    textDecoration: 'none',
    color: 'black',
    fontFamily: "Roboto",
    padding: theme.spacing(1, 2),
  }
}));
const StyledRoot = styled(AppBar)(() => ({
  boxShadow: 'none',
  width: '100%',
  backgroundColor: '#eeeeee',
  alignItems: 'center',
  fontWeight: 'bold',
}));


const Homepage: React.FC = (): JSX.Element => {

  const classes = useStyles();
  const dispatch = useDispatch();
  // if (window.location.href.indexOf('reload') == -1) {
  //   window.location.replace(window.location.href + '?reload');
  // }

  const user = useSelector((state: RootState) => state.user);
  const bottomLinks = user.isAuthenticated ? (
    <StyledRoot style={{ boxShadow: "none" }}>
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
          sx={{ margin: 3 }}
        >
          <NavLink exact to='#' className={`${classes.navLink} nav-link`} onClick={(e) => dispatch(logOutUser())}>
            Đăng xuất
          </NavLink>
        </Stack>
      </Toolbar>

    </StyledRoot>
  ) : (<StyledRoot style={{ boxShadow: "none" }} >
    <Stack
      direction="row"
      alignItems="center"
      spacing={{
        xs: 0.5,
        sm: 1,
      }}
      sx={{ margin: 3 }}
    >
      <Box>
        <Link style={{ textDecoration: 'none' }} to={'/loginuser'}>
          <Button>Đăng nhập</Button>
        </Link>

        <Link style={{ textDecoration: 'none' }} to={'/register'}>
          <Button>Đăng ký</Button>
        </Link>
      </Box>
    </Stack>
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
