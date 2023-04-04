import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { loginUser } from "redux/actions/user";
import FormField from "pages/auth/FormField";
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
  btnLogin: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
    textDecoration: 'none'
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },
}));

interface IInitialValues {
  username: string;
  password: string;
}

const LoginUser: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [checked, setChecked] = React.useState<boolean>(false);

  const initialValues: IInitialValues = {
    username: "",
    password: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    dispatch(loginUser(values, setSubmitting));
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Invalid username!"),
    password: Yup.string().required("Invalid password!"),
  });

  React.useEffect(() => {
    document.title = "ĐĂNG NHẬP ";
  }, []);

  return (
    <Grid
      container
      className={classes.root}
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <img style={{ height: "96px", width: "90px" }} src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-CONG-NGHE-THANH-PHO-HO-CHI-MINH-HUTECH.png" />
      <Typography style={{ fontWeight: "bold", fontSize: "20px", marginTop: "5px" }} >
        Đăng Nhập
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <FormField isRegister={false} />
            </Grid>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              style={{ backgroundColor: 'black', color: "white" }}
              className={classes.btnLogin}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Nhập"}
            </Button>
            <Grid style={{ marginTop: "10px" }} container>
              <Grid item xs>
                <Link to="/login" style={{ color: 'black', float: 'left', textDecoration: "none" }}>
                  Bạn quên mật khẩu?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" style={{ color: 'black', textDecoration: "none" }}>
                  Tạo tài khoản
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default LoginUser;
