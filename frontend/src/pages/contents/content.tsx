import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import FeedContent from "pages/contents/FeedContent";
const Content: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            user?.events?.filter((event: any) =>
                event.nameEvent || event.poster || event.approver || event.comments || event.quantityUser
                || event.job || event.location || event.departmentEvent || event.costs || event.dayStart
                || event.dayEnd || event.image
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "TRANG CHỦ";
    }, []);

    return (
        <>
            {events.map((event: any) =>
                <FeedContent event={event} key={event._id} />) ?? (
                    <p>No FeedContent Found.</p>
                )}
        </>
    );
};

export default Content;
