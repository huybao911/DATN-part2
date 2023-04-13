import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { createJobEvent } from "redux/actions/sManager";
import FormJobEvent from "pages/SManager/FormJobEvent";
import FormEvent from "pages/auth/FormEvent-Smanager";

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
    jobEvent: any;
};

interface IInitialValues {
    nameJob: string;
    quantity: number;
    eventId: any;
}

const CreateJobEvent: React.FC<Props> = ({ jobEvent }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        nameJob: jobEvent?.nameJob ?? "",
        quantity: jobEvent?.quantity ?? "",
        eventId: jobEvent?.eventId ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(createJobEvent(values, setSubmitting));

    const validationSchema = Yup.object({
        nameJob: Yup.string().required("required!"),
        quantity: Yup.string().required("required!"),
        eventId: Yup.string().required("required!"),
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
                            <FormJobEvent />   
                            <FormEvent isEvent={true}/>       
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='small'
                                className={classes.btnLogin}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Tạo Công Việc"}
                            </Button>
                        </form>
                    )}
                </Formik>
            </AccordionDetails>
        </Accordion>
    );
};

export default CreateJobEvent;
