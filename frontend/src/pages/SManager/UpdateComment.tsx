import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { commentEvent } from "redux/actions/sManager";
import FormComment from "pages/SManager/FormComment";

const useStyles = makeStyles((theme) => ({
    btnLogin: {
        '&.MuiButton-root:hover': {
            backgroundColor:"transparent",
        }
    },
  }));

type Props = {
    event: any;
};

interface IInitialValues {
    contentComment: string;
}

const CommentPost: React.FC<Props> = ({ event }): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        contentComment: event?.contentComment ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(commentEvent(values, event._id, setSubmitting));

    const validationSchema = Yup.object({
        contentComment: Yup.string().required("required!"),
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
                    <Box style={{ display: "flex", flexDirection: "row", marginTop:"30px" }}>
                        <FormComment />
                        <Button
                            disableRipple
                            type='submit'
                            className={classes.btnLogin}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size='1rem' /> : <SendIcon style={{width: '16px'}} />}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default CommentPost;
