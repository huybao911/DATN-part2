import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
    formTextField: {
        "& .MuiInputBase-root": {
            "& fieldset": {
              borderRadius: "22px",
            },
        }
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
            <FormControl style={{paddingLeft: "38px" }}>
                <TextField
                    style={{width:"320px", }}
                    className={classes.formTextField}
                    variant="outlined"
                    inputProps={{
                        style: {
                            fontSize: '12px',
                            padding: '12px' 
                        }
                    }}
                    name='contentComment'
                    value={values.contentComment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Nhập bình luận...'
                    helperText={touched.contentComment ? errors.contentComment : ""}
                    error={touched.contentComment ? Boolean(errors.contentComment) : false}
                />
            </FormControl>
        </>
    );
};

export default FormComment;
