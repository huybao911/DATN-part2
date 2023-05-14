import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, FormControl, FormLabel, TextField, Accordion, AccordionDetails } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateEvent } from "redux/actions/Manager";
import FormEvent from "pages/Manager/FormEvent";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    btn: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
    accordion: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1),
    },
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(2, 0),
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
    image: any;
    contentEvent: string;
}

const CreatePost: React.FC<Props> = ({ event }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        nameEvent: event?.nameEvent ?? "",
        location: event?.location ?? "",
        dayStart: event?.dayStart ?? "",
        dayEnd: event?.dayEnd ?? "",
        image: event?.image ?? "",
        contentEvent: event?.contentEvent ?? "",
    };


    // const onHandleSubmit = (
    //     values: IInitialValues,
    //     { setSubmitting }: any
    // ): Promise<void> =>
    //     dispatch<any>(updateEvent(values, event._id, setSubmitting));

    const validationSchema = Yup.object({
        nameEvent: Yup.string().required("required!"),
        location: Yup.string().required("required!"),
        dayStart: Yup.string().required("required!"),
        dayEnd: Yup.string().required("required!"),
        contentEvent: Yup.string().required("required!"),
        // image: Yup.string().required("required!"),
    });

    return (
        <Accordion className={classes.accordion} elevation={0}>
            <AccordionDetails>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values: any, { setSubmitting }) => {
                        let formData = new FormData();
                        formData.append("nameEvent", values.nameEvent);
                        formData.append("location", values.location);
                        formData.append("dayStart", values.dayStart);
                        formData.append("dayEnd", values.dayEnd);
                        formData.append("image", values.image);
                        formData.append("contentEvent", values.contentEvent);
                        dispatch(updateEvent(formData, event._id, setSubmitting));
                    }}
                >
                    {({ values, handleChange, handleBlur, errors, touched, setFieldValue, isSubmitting, handleSubmit }) => (
                        <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Tên sự kiện</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name='nameEvent'
                                    value={values.nameEvent}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập tên sự kiện'
                                    helperText={touched.nameEvent ? errors.nameEvent : ""}
                                    error={touched.nameEvent ? Boolean(errors.nameEvent) : false}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Địa điểm tổ chức</FormLabel>
                                <TextField
                                    fullWidth
                                    maxRows={10}
                                    multiline
                                    variant="outlined"
                                    name='location'
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập địa điểm tổ chức'
                                    helperText={touched.location ? errors.location : ""}
                                    error={touched.location ? Boolean(errors.location) : false}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Ngày giờ bắt đầu</FormLabel>
                                <TextField
                                    fullWidth
                                    maxRows={10}
                                    multiline
                                    variant="outlined"
                                    name='dayStart'
                                    value={values.dayStart}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập ngày giờ bắt đầu'
                                    helperText={touched.dayStart ? errors.dayStart : ""}
                                    error={touched.dayStart ? Boolean(errors.dayStart) : false}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Ngày giờ kết thúc</FormLabel>
                                <TextField
                                    fullWidth
                                    maxRows={10}
                                    multiline
                                    variant="outlined"
                                    name='dayEnd'
                                    value={values.dayEnd}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập ngày giờ kết thúc'
                                    helperText={touched.dayEnd ? errors.dayEnd : ""}
                                    error={touched.dayEnd ? Boolean(errors.dayEnd) : false}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Nội dung sự kiện</FormLabel>
                                <TextField
                                    fullWidth
                                    maxRows={10}
                                    multiline
                                    variant="outlined"
                                    name='contentEvent'
                                    value={values.contentEvent}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập nội dung sự kiện'
                                    helperText={touched.contentEvent ? errors.contentEvent : ""}
                                    error={touched.contentEvent ? Boolean(errors.contentEvent) : false}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <FormLabel classes={{ root: classes.formLabel }}>Hình ảnh</FormLabel>
                                <input
                                    accept="image/*"
                                    name='image'
                                    type='file'
                                    onChange={(e: any) => {
                                        setFieldValue('image', e.target.files[0]);
                                    }}
                                    onBlur={handleBlur}
                                />
                            </FormControl>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='small'
                                className={classes.btn}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Cập Nhật Sự Kiện"}
                            </Button>
                        </form>
                    )}
                </Formik>
            </AccordionDetails>
        </Accordion>
    );
};

export default CreatePost;
