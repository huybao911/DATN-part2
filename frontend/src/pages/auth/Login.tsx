import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { loginSManager } from "redux/actions/sManager";
import { loginManager } from "redux/actions/Manager";
import { loginAdmin } from "redux/actions/admin";

import FormField from "pages/auth/FormField";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

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

const Login: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked1, setChecked1] = React.useState("admin");
  const [checked2, setChecked2] = React.useState("smanager");
  const [checked3, setChecked3] = React.useState("manager");



  const initialValues: IInitialValues = {
    username: "",
    password: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    if (checked1 === "admin") {
      dispatch(loginAdmin(values, setSubmitting))
    } else if (checked2 === "smanager") {
      dispatch(loginSManager(values, setSubmitting))
    } else if (checked3 === "manager") {
      dispatch(loginManager(values, setSubmitting))
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1(event.target.value);
    setChecked2(event.target.value);
    setChecked3(event.target.value);
  };



  const validationSchema = Yup.object({
    username: Yup.string().required("Invalid username!"),
    password: Yup.string().required("Invalid password!"),
  });

  React.useEffect(() => {
    document.title = "ĐĂNG NHẬP QUYỀN HẠN CAO";
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
        ĐĂNG NHẬP QUYỀN HẠN CAO
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <FormField />
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
          </form>
        )}
      </Formik>
      <div className={classes.checkboxWrapper}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="admin"
          name="radio-buttons-group"
        >

          <FormControlLabel value="admin" control={<Radio onChange={handleChange} />} label="Admin" />
          <FormControlLabel value="smanager" control={<Radio onChange={handleChange} />} label="Quản Lý Cấp Cao" />
          <FormControlLabel value="manager" control={<Radio onChange={handleChange} />} label="Quản Lý" />
        </RadioGroup>

      </div>

      {/* <div className={classes.checkboxWrapper}>
        <Checkbox
          checked={checked2}
          onChange={handleChange1}
          inputProps={{ "aria-label": "controlled" }}
        />
        <p>Super Manager</p>
      </div> */}
    </Grid>
  );
};

export default Login;
