import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { loginUser } from "redux/actions/user";
import { loginAdmin } from "redux/actions/admin";
import FormField from "pages/auth/FormField";

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
  const [checked, setChecked] = React.useState<boolean>(false);

  const initialValues: IInitialValues = {
    username: "",
    password: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
      // check
      // ? 
      dispatch(loginUser(values, setSubmitting))
      // : dispatch(loginUser(values, setSubmitting));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormField />
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              className={classes.btnLogin}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Nhập"}
            </Button>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default LoginUser;
