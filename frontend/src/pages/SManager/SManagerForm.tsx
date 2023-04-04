import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Container, Card } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { approvePost } from "redux/actions/sManager";
import FormPost from "pages/SManager/FormPost";
import FeedPost from "pages/Manager/FeedPost";


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
  post: any;
};

interface IInitialValues {
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

const SManagerForm: React.FC<Props> = ({ post }): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues: IInitialValues = {
    title: post?.title ?? "",
    content: post?.content ?? "",
    image: post?.image ?? "",
    createdAt: post?.createdAt ?? "",
  };


  const onHandleSubmit = (
    values: IInitialValues,
    { setSubmitting }: any
  ): Promise<void> =>
    dispatch<any>(approvePost(values, post._id, setSubmitting));

  const validationSchema = Yup.object({
    title: Yup.string().required("required!"),
    content: Yup.string().required("required!"),
    image: Yup.string().required("required!"),
    createdAt: Yup.string().required("required!"),
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
                <FormPost />
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  size='small'
                  className={classes.btnLogin}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size='1rem' /> : "Duyệt Bài Viết"}
                </Button>
              {/* <Button
                type='button'
                variant='contained'
                color='secondary'
                size='small'
                className={classes.btnLogin}
                onClick={(e) => dispatch(deleteUser(user._id))}
              >
                Xóa
              </Button> */}
            </form>
          )}
        </Formik>
      </AccordionDetails>
    </Accordion>
  );
};

export default SManagerForm;
