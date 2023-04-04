import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import FormField from "pages/auth/FormField";
import { registerSManagerAdmin } from "redux/actions/sManager";
import { registerManagerAdmin } from "redux/actions/Manager";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import FormFieldDepartment from "pages/auth/FormDepartment_Admin";

import { Link } from 'react-router-dom';

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
  department: string;
}

const Register: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked2, setChecked2] = React.useState("smanager");
  const [checked3, setChecked3] = React.useState("manager");

  const initialValues: IInitialValues = {
    username: "",
    email: "",
    password: "",
    department: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {

    if (checked2 === "smanager") {
      dispatch(registerSManagerAdmin({ ...values, role: "640cc3c229937ffacc4359f8" }, setSubmitting));
    } else if (checked3 === "manager") {
      dispatch(registerManagerAdmin({ ...values, role: "640cc3ca29937ffacc4359fa" }, setSubmitting));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.value);
    setChecked3(event.target.value);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Invalid username!"),
    email: Yup.string().email("Invalid email!").required("Invalid email!"),
    password: Yup.string().required("Invalid password!"),
    department: Yup.string().required("Invalid department!"),
  });

  React.useEffect(() => {
    document.title = "THÊM TÀI KHOẢN ";
  }, []);

  return (
    <Grid
      container
      className={classes.root}
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Typography style={{ fontWeight: "bold", fontSize: "20px", marginTop: "5px" }} >
        Tạo Tài Khoản
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
            <div className={classes.checkboxWrapper}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="admin"
                name="radio-buttons-group"
              >
                <FormControlLabel value="smanager" control={<Radio onChange={handleChange} />} label="Quản Lý Cấp Cao" />
                <FormControlLabel value="manager" control={<Radio onChange={handleChange} />} label="Quản Lý" />
              </RadioGroup>
            </div>
            <Grid style={{ marginTop: "10px" }} container>
              <Grid item xs>
                <Button
                  type='submit'
                  variant='contained'
                  style={{ backgroundColor: 'black', color: "white" }}
                  className={classes.btnRegister}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size='1rem' /> : "Đăng Ký"}
                </Button>
              </Grid>
              <Grid item>
                <Link to="/users">
                  <Button variant='contained' className={classes.btnRegister} style={{ backgroundColor: 'black', color: "white" }} >
                    QUAY LẠI
                  </Button>
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
