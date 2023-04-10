import * as React from "react";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostStorage, logOutUser } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import { IPostStorage } from "redux/types/postStorage";
import FeedStoragePost from "pages/User/FeedStoragePost";
import { Button, Stack, AppBar, Box, Toolbar, Typography, Popover, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import { Approval, Favorite, Logout, Person, Settings, Notifications } from '@mui/icons-material';
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

    const [posts, setPosts] = React.useState<IPostStorage[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getPostStorage());
    }, [dispatch]);

    React.useEffect(() => {
        setPosts(() =>
            user?.postStorages?.filter((post: any) =>
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
        document.title = "TRANG CHỦ";
    }, []);

    return (
        <>
            <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>Bài Viết Đã Lưu</Typography>
            {posts.map((postStorage: any) =>
                <FeedStoragePost postStorage={postStorage} key={postStorage._id} />) ?? (
                    <p>No FeedStoragePost Found.</p>
                )}
        </>
    );
};

export default StoragePost;
