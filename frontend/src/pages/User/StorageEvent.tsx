import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventStorage } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IEventStorage } from "redux/types/eventStorage";
import FeedStorageEvent from "pages/User/FeedStorageEvent";
import { Typography } from '@mui/material';

const StoragePost: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [events, setEvents] = React.useState<IEventStorage[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getEventStorage());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            user?.eventStorages?.filter((event: any) =>
            event.eventId
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "TRANG CHỦ";
    }, []);

    return (
        <>
            <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>Sự Kiện Đã Lưu</Typography>
            {events.map((eventStorage: any) =>
                <FeedStorageEvent eventStorage={eventStorage} key={eventStorage._id} />) ?? (
                    <p>No FeedStoragePost Found.</p>
                )}
        </>
    );
};

export default StoragePost;
