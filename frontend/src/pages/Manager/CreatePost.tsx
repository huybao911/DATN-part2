import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { createPost } from "redux/actions/Manager";
import FormPost from "pages/Manager/FormPost";
import FormEvent from "pages/auth/FormEvent-Manager";

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
    event: any;
    image:string;
}

const CreatePost: React.FC<Props> = ({ post }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        title: post?.title ?? "",
        content: post?.content ?? "",
        event: post?.event ?? "",
        image: post?.image ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(createPost(values, post._id, setSubmitting));

    const validationSchema = Yup.object({
        title: Yup.string().required("required!"),
        content: Yup.string().required("required!"),
        event: Yup.string().required("required!"),
        image: Yup.string().required("required!"),
    });

    return (
        <Accordion className={classes.accordion} elevation={0}>
            {/* <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id={`panel1a-header-${user._id}`}
      >
        <Typography>{user?.username ?? null}</Typography>
      </AccordionSummary> */}
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
                            <FormEvent isEvent={true}/>        
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='small'
                                className={classes.btnLogin}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Tạo Bài Viết"}
                            </Button>
                        </form>
                    )}
                </Formik>
            </AccordionDetails>
        </Accordion>
    );
};

export default CreatePost;
