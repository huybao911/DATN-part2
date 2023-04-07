import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel } from "@material-ui/core";
import { useFormikContext } from "formik";
import { MenuItem } from "@mui/material";
import Select from '@mui/material/Select';

import { getDepartments } from "redux/actions/sManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { IDepartment } from "redux/types/department";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(2, 0),
    },
    placeholder: {
        color: "#aaa"
    }
}));

type Props = {
    isDepartmentCbb?: boolean;
};

interface IInitialValues {
    departmentEvent: any;
}

// const Placeholder = ({ children }: { children: any }) => {
//     const classes = useStyles();
//     return <div className={classes.placeholder}>{children}</div>;
// };

const FormField: React.FC<Props> = ({ isDepartmentCbb = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IInitialValues>();

    const [departments, setDepartments] = React.useState<IDepartment[]>([]);
    const Department = useSelector((state: RootState) => state.smanager);


    React.useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

    React.useEffect(() => {
        setDepartments(() => Department?.departments?.filter((departmentEvent: any) => departmentEvent.nameDepartment));
    }, [Department]);

    return (
        <>

            {isDepartmentCbb ? (
                <FormControl fullWidth className={classes.formControl}>
                    <FormLabel classes={{ root: classes.formLabel }}>Khoa tổ chức</FormLabel>
                    <Select
                        name="departmentEvent"
                        labelId="demo-simple-select-label"
                        id="handle-department"
                        value={values.departmentEvent._id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.departmentEvent ? Boolean(errors.departmentEvent) : false}

                    // renderValue={
                    //     role !== "" ? undefined : () => <Placeholder>Role</Placeholder>
                    // }
                    >
                        {departments?.map((departmentEvent: any) => (
                            <MenuItem value={departmentEvent._id} key={departmentEvent._id}>
                                {departmentEvent.nameDepartment}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormField;
