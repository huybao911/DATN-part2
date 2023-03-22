import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import FormField from "pages/auth/FormField";
import { updateUser, deleteUser } from "redux/actions/admin";
import FormFieldRole from "pages/auth/FormFieldRole";
import FormFieldDepartment from "pages/auth/FormDepartment_Admin";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btnLogin: {
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
  accordion: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
  },
}));

type Props = {
  user: any;
};

interface IInitialValues {
  username: string;
  email?: string;
  password: string;
  role?: string;
  department?: any;
}

const UserForm: React.FC<Props> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues: IInitialValues = {
    username: user?.username ?? "",
    email: user?.email ?? "",
    password: "",
    role: user?.role ?? "",
    department: user?.department ?? ""
  };

  const onHandleSubmit = (
    values: IInitialValues,
    { setSubmitting }: any
  ): Promise<void> =>
    dispatch<any>(updateUser(values, user._id, setSubmitting));

  const validationSchema = Yup.object({
    username: Yup.string().required("required!"),
    email: Yup.string().email("Invalid email!").required("required!"),
    password: Yup.string().required("required!"),
    role: Yup.string().required("required!"),
    department: Yup.string().required("required!")

  });

  return (
    <Accordion className={classes.accordion} elevation={0}>
      <AccordionDetails>
        <Formik
          
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onHandleSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormField isRegister={true} />
              <FormFieldRole isRole={true} />
              <FormFieldDepartment isDepartmentCbb={true} />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='small'
                className={classes.btnLogin}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size='1rem' /> : "Cập Nhật"}
              </Button>
            </form>
          )}
        </Formik>
      </AccordionDetails>
    </Accordion>

    /* <Accordion className={classes.accordion} elevation={0}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls='panel1a-content'
      id={`panel1a-header-${user._id}`}
    >
      <Typography>{user?.username ?? null}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormField isRegister={true} />
            <FormFieldRole isRole={true} />
            <FormFieldDepartment isDepartmentCbb={true} />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              size='small'
              className={classes.btnLogin}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size='1rem' /> : "Cập Nhật"}
            </Button>
            <Button
              type='button'
              variant='contained'
              color='secondary'
              size='small'
              className={classes.btnLogin}
              onClick={(e) => dispatch(deleteUser(user._id))}
            >
              Xóa
            </Button>
          </form>
        )}
      </Formik>
    </AccordionDetails>
    </Accordion> */

  );
};

export default UserForm;
