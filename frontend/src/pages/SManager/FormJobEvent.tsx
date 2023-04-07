import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField, Button } from "@material-ui/core";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(2, 0),
    },
}));


interface IValues {
    nameJob: string;
}


const FormEvent: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const { values, handleChange, handleBlur, errors, touched } =
        useFormikContext<IValues>();

    return (
        <>
            <FormControl fullWidth className={classes.formControl}>
                <FormLabel classes={{ root: classes.formLabel }}>Tên công việc</FormLabel>
                <TextField
                    fullWidth
                    variant="outlined"
                    name='nameJob'
                    value={values.nameJob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập tên công việc'
                    helperText={touched.nameJob ? errors.nameJob : ""}
                    error={touched.nameJob ? Boolean(errors.nameJob) : false}
                />
            </FormControl>
        </>
    );
};

export default FormEvent;
