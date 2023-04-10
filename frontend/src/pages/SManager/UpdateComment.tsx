import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { commentPost } from "redux/actions/sManager";
import FormComment from "pages/SManager/FormComment";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    btnLogin: {
        marginTop: theme.spacing(1.5),
        marginRight: theme.spacing(1),
        padding: theme.spacing(1, 2),
    },
}));

type Props = {
    post: any;
};

interface IInitialValues {
    // contentComment: string;
}

const CommentPost: React.FC<Props> = ({ post }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        // contentComment: post?.contentComment ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(commentPost(values, post._id, setSubmitting));

    const validationSchema = Yup.object({
        // contentComment: Yup.string().required("required!"),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onHandleSubmit}
        >
            {({ isSubmitting, handleSubmit }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Box style={{display:"flex", flexDirection:"row"}}>
                        <FormComment />
                        <Button
                            style={{ backgroundColor: "black", color: "white" }}
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='small'
                            className={classes.btnLogin}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size='1rem' /> : "Bình Luận"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default CommentPost;
