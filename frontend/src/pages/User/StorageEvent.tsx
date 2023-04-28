import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorager } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import FeedStorageEvent from "pages/User/FeedStorageEvent";
import { Typography } from '@mui/material';

const StoragePost: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getStorager());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            user?.events?.filter((event: any) =>
            event.nameEvent
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "TRANG CHỦ";
    }, []);

    return (
        <>
            <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>Sự Kiện Đã Lưu</Typography>
            {events.map((event: any) =>
                <FeedStorageEvent event={event} key={event._id} />) ?? (
                    <p>No FeedStoragePost Found.</p>
                )}
        </>
    );
};

export default StoragePost;
