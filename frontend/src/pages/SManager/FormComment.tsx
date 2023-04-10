import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
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
    contentComment: string;
}


const FormComment: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const { values, handleChange, handleBlur, errors, touched } =
        useFormikContext<IValues>();

    return (
        <>
            <FormControl fullWidth className={classes.formControl}>
                <TextField
                    style={{width:"400px"}}
                    variant="outlined"
                    name='contentComment'
                    value={values.contentComment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập bình luận'
                    helperText={touched.contentComment ? errors.contentComment : ""}
                    error={touched.contentComment ? Boolean(errors.contentComment) : false}
                />
            </FormControl>
        </>
    );
};

export default FormComment;
