import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { ISManager } from "redux/types/sManager";
import { Box } from "@mui/material";
import CreateEvent from "./CreateEvent";
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
        document.title = "EVENT";
    }, []);

    return (
        <>
            {SManagers.map((event: any) =>
                <Box key={event._id} >
                    <CreateEvent event={event}  />
                </Box>
            )}
        </>
    );
};

export default NewEvent;
