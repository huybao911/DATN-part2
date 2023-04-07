import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel } from "@material-ui/core";
import { useFormikContext } from "formik";
import { MenuItem } from "@mui/material";
import Select from '@mui/material/Select';

import { getEvents } from "redux/actions/sManager";
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
    eventId: any;
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
    const Event = useSelector((state: RootState) => state.smanager);


    React.useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() => Event?.events?.filter((eventId: any) => eventId.nameEvent));
    }, [Event]);

    return (
        <>

            {isEvent ? (
                <FormControl fullWidth className={classes.formControl}>
                    <FormLabel classes={{ root: classes.formLabel }}>Sự kiện</FormLabel>
                    <Select
                        name="eventId"
                        labelId="demo-simple-select-label"
                        id="handle-event"
                        value={values.eventId._id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.eventId ? Boolean(errors.eventId) : false}

                    // renderValue={
                    //     role !== "" ? undefined : () => <Placeholder>Role</Placeholder>
                    // }
                    >
                        {events?.map((eventId: any) => (
                            <MenuItem value={eventId._id} key={eventId._id}>
                                {eventId.nameEvent}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormField;
