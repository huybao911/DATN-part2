import * as React from "react";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostApplyJob, logOutUser } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IApplyJob } from "redux/types/applyJob";
import FeedApplyPost from "pages/User/FeedApplyPost";
import { Button, Stack, AppBar, Box, Toolbar, Typography, Popover, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import { Person, Favorite, Logout, Notifications, Approval } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { purple } from '@mui/material/colors';

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: '#eeeeee',
    fontWeight: 'bold',
}));
const StoragePost: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [posts, setPosts] = React.useState<IApplyJob[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getPostApplyJob());
    }, [dispatch]);

    React.useEffect(() => {
        setPosts(() =>
            user?.applyJobs?.filter((post: any) =>
                post.postId
            ));
    }, [user]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        document.title = "BÀI VIẾT ỨNG TUYỂN";
    }, []);

    return (

        <>
            <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>Bài Viết Đã Ứng Tuyển</Typography>
            {posts.map((postApply: any) =>
                <FeedApplyPost postApply={postApply} key={postApply._id} />) ?? (
                    <p>No FeedStoragePost Found.</p>
                )}
        </>
    );
};

export default StoragePost;
