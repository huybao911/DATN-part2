import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { IDepartment } from "redux/types/department";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

import { addDepartment, getDepartments } from "redux/actions/admin";
import FormFieldDepartment from "pages/admin/FormFieldDepartment";
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
    nameDepartment: string;
    keyDepartment: string;
}

const AddDepartment: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ADMIN = "640cbf0573094a5e2e001859";

  const [departments, setDepartments] = React.useState<IDepartment[]>([]);
  const Department = useSelector((state: RootState) => state.admin);

  const initialValues: IInitialValues = {
   nameDepartment: "",
   keyDepartment: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
         dispatch(addDepartment({ ...values, role: ADMIN }, setSubmitting))
  };

  const validationSchema = Yup.object({
    nameDepartment: Yup.string().required("Invalid nameDepartment!"),
    keyDepartment: Yup.string().required("Invalid keyDepartment!"),
  });

  React.useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  React.useEffect(() => {
    setDepartments(() => Department?.departments?.filter((department: any) => department.nameDepartment ));
  }, [Department]);

  React.useEffect(() => {
    document.title = "THÊM TÒA NHÀ ";
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
            <FormFieldDepartment />
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              className={classes.btnRegister}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size='1rem' /> : "Thêm Khoa"}
            </Button>
          </form>
        )}
      </Formik>
      <div style={{marginTop: "40px"}}>
        <Link to={"/department"}>
          <button style={{fontSize:"20px", backgroundColor:"#000", color:"#fff",border:"10px solid black"}}>QUAY LẠI</button>
        </Link>
      </div>
    </Grid>
  );
};

export default AddDepartment;
