import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { ISManager } from "redux/types/sManager";
import { Box } from "@mui/material";
import CreateJobEvent from "./CreateJobEvent";
const NewEvent: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [SManagers, setSManagers] = React.useState<ISManager[]>([]);
    const smanager = useSelector((state: RootState) => state.smanager);

    React.useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    React.useEffect(() => {
        setSManagers(() => 
        smanager?.users?.filter((user: any) =>
         user.role.keyRole === "smanager"
         ));
    }, [smanager]);

    React.useEffect(() => {
        document.title = "JOB EVENT";
    }, []);

    return (

        <>
            {SManagers.map((jobEvent: any) =>
                <Box key={jobEvent._id} >
                    <CreateJobEvent jobEvent={jobEvent}  />
                </Box>
            )}
        </>
    );
};

export default NewEvent;
