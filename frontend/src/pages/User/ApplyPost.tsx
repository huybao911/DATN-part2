import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplyJob } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IApplyJob } from "redux/types/applyJob";
import FeedApplyJob from "pages/User/FeedApplyJob";
import { Typography} from '@mui/material';

const StoragePost: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [jobs, setJobs] = React.useState<IApplyJob[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getApplyJob());
    }, [dispatch]);

    React.useEffect(() => {
        setJobs(() =>
            user?.applyJobs?.filter((post: any) =>
                post.postId
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "BÀI VIẾT ỨNG TUYỂN";
    }, []);

    return (

        <>
            <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>Công Việc Đã Ứng Tuyển</Typography>
            {jobs.map((jobApply: any) =>
                <FeedApplyJob jobApply={jobApply} key={jobApply._id} />) ?? (
                    <p>No FeedStoragePost Found.</p>
                )}
        </>
    );
};

export default StoragePost;
