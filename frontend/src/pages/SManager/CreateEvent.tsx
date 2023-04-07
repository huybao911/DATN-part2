import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useDispatch } from "react-redux";
import { createEvent } from "redux/actions/sManager";
import FormEvent from "pages/SManager/FormEvent";
import FormDepartment from "pages/auth/FormDepartment_SManager";

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
    quantityUser: number;
    location: string;
    costs: string;
    dayStart: string;
    dayEnd: string;
    departmentEvent: any;
}

const CreateEvent: React.FC<Props> = ({ event }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        nameEvent: event?.nameEvent ?? "",
        quantityUser: event?.quantityUser ?? "",
        location: event?.location ?? "",
        costs: event?.costs ?? "",
        dayStart: event?.dayStart ?? "",
        dayEnd: event?.dayEnd ?? "",
        departmentEvent: event?.departmentEvent ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(createEvent(values, setSubmitting));

    const validationSchema = Yup.object({
        nameEvent: Yup.string().required("required!"),
        quantityUser: Yup.string().required("required!"),
        location: Yup.string().required("required!"),
        costs: Yup.string().required("required!"),
        dayStart: Yup.string().required("required!"),
        dayEnd: Yup.string().required("required!"),
        departmentEvent: Yup.string().required("required!"),
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
                            <FormEvent />   
                            <FormDepartment isDepartmentCbb={true}/>       
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
