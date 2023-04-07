import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel } from "@material-ui/core";
import { useFormikContext } from "formik";
import { MenuItem } from "@mui/material";
import Select from '@mui/material/Select';

import { getEvents } from "redux/actions/Manager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";

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
    isEvent?: boolean;
};

interface IInitialValues {
    event: any;
}

// const Placeholder = ({ children }: { children: any }) => {
//     const classes = useStyles();
//     return <div className={classes.placeholder}>{children}</div>;
// };

const FormField: React.FC<Props> = ({ isEvent = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IInitialValues>();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const Event = useSelector((state: RootState) => state.manager);


    React.useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() => Event?.events?.filter((event: any) => event.nameEvent));
    }, [Event]);

    return (
        <>

            {isEvent ? (
                <FormControl fullWidth className={classes.formControl}>
                    <FormLabel classes={{ root: classes.formLabel }}>Sự kiện</FormLabel>
                    <Select
                        name="event"
                        labelId="demo-simple-select-label"
                        id="handle-event"
                        value={values.event._id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.event ? Boolean(errors.event) : false}

                    // renderValue={
                    //     role !== "" ? undefined : () => <Placeholder>Role</Placeholder>
                    // }
                    >
                        {events?.map((event: any) => (
                            <MenuItem value={event._id} key={event._id}>
                                {event.nameEvent}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormField;
