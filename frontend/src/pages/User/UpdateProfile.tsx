import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateProfile } from "redux/actions/user";
import FormProfile from "pages/User/FormProfile";


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
    email: string;
    fullName: string;
    birthday: string;
    mssv: string;
    classUser: string;
    phone: string;
    address: string;
}

const SManagerForm: React.FC<Props> = ({ user }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        username: user?.username ?? "",
        email: user?.email ?? "",
        fullName: user?.fullName ?? "",
        birthday: user?.birthday ?? "",
        mssv: user?.mssv ?? "",
        classUser: user?.classUser ?? "",
        phone: user?.phone ?? "",
        address: user?.address ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(updateProfile(values, user._id, setSubmitting));

    const validationSchema = Yup.object({
        username: Yup.string().required("required!"),
        email: Yup.string().required("required!"),
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
                    <FormProfile />
                    <Button
                        style={{ backgroundColor: "black", color: "white", marginLeft:"476px" }}
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='small'
                        className={classes.btnLogin}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật thông tin"}
                    </Button>
                </form>
            )}
        </Formik>
    );
};

export default SManagerForm;
