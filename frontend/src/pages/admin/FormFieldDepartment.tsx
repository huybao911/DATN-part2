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

type Props = {
  isDepartment?: boolean;
};

interface IValues {
  nameDepartment: string;
}

const FormFieldDepartment: React.FC<Props> = ({ isDepartment = false }): JSX.Element => {
  
  const classes = useStyles();
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<IValues>();

  return (
    <>
      {isDepartment ? (
       <FormControl fullWidth className={classes.formControl}>
       <FormLabel classes={{ root: classes.formLabel }}>Tên khoa</FormLabel>
       <TextField
         fullWidth
         name='nameDepartment'
         value={values.nameDepartment}
         onChange={handleChange}
         onBlur={handleBlur}
         placeholder='Nhập tên khoa muốn thêm'
         helperText={touched.nameDepartment ? errors.nameDepartment : ""}
         error={touched.nameDepartment ? Boolean(errors.nameDepartment) : false}
       />
     </FormControl>
      ) : null}
    </>
  );
};

export default FormFieldDepartment;
