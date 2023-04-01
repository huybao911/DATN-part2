import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import { registerUser } from "redux/actions/user";
import FormField from "pages/auth/FormField";
import FormFieldDepartment from "pages/auth/FormDepartment_User";
import { color } from "@mui/system";

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
}));

interface IInitialValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues: IInitialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    dispatch(registerUser({ ...values, role: "640cc3d329937ffacc4359fc" }, setSubmitting));
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Invalid username!"),
    email: Yup.string().email("Invalid email!").required("Invalid email!"),
    password: Yup.string().required("Invalid password!"),
  });

  React.useEffect(() => {
    document.title = "ĐĂNG KÝ";
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
        ĐĂNG KÝ
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <FormField isRegister={true} />
              <FormFieldDepartment isDepartmentCbb={true} />
            </Grid>
            <Button
              fullWidth
              type='submit'
              variant='contained'
              style={{ backgroundColor: 'black', color: "white" }}
              className={classes.btnRegister}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Ký"}
            </Button>
            <Grid style={{marginTop:"10px"}} container justifyContent="flex-end">
              <Grid>
                <Link to="/loginuser"  style={{color:'black', textDecoration:"none"}}>
                  Bạn đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default Register;
