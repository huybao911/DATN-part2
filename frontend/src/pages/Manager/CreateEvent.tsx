import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { createEvent } from "redux/actions/Manager";
import FormEvent from "pages/Manager/FormEvent";

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
    event: any;
};

interface IInitialValues {
    nameEvent: string;
    location: string;
    dayStart: string;
    dayEnd: string;
    image: string;
}

const CreateEvent: React.FC<Props> = ({ event }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        nameEvent: event?.nameEvent ?? "",
        location: event?.location ?? "",
        dayStart: event?.dayStart ?? "",
        dayEnd: event?.dayEnd ?? "",
        image: event?.image ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(createEvent(values, setSubmitting));

    const validationSchema = Yup.object({
        nameEvent: Yup.string().required("required!"),
        location: Yup.string().required("required!"),
        dayStart: Yup.string().required("required!"),
        dayEnd: Yup.string().required("required!"),
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
                        <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                            <FormEvent />        
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='small'
                                className={classes.btnLogin}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Tạo Sự Kiện"}
                            </Button>
                        </form>
                    )}
                </Formik>
            </AccordionDetails>
        </Accordion>
    );
};

export default CreateEvent;
