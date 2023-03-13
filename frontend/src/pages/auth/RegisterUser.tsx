import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { registerUser } from "redux/actions/user";
import FormField from "pages/auth/FormField";
import FormFieldDepartment from "pages/auth/FormDepartment_User";

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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormField isRegister={true} />
            <FormFieldDepartment isDepartmentCbb={true}/>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              className={classes.btnRegister}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Ký"}
            </Button>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default Register;
