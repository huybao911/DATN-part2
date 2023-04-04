import * as React from "react";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostStorage, logOutUser } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import FeedStoragePost from "pages/User/FeedStoragePost";
import { Button, Stack, AppBar, Box, Toolbar, Typography, Popover, MenuItem, Avatar, ListItemIcon, Divider } from '@mui/material';
import { PersonAdd, Favorite, Logout, Person, Settings, Notifications } from '@mui/icons-material';
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

    const [posts, setPosts] = React.useState<IPost[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getPostStorage());
    }, [dispatch]);

    React.useEffect(() => {
        setPosts(() =>
            user?.posts?.filter((post: any) =>
                post.title || post.content || post.image
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
            <StyledRoot style={{ boxShadow: "none" }}>
                <Toolbar>
                    <Link style={{ textDecoration: 'none' }} to={'/loginuser'}>
                        <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
                    </Link>
                    <Typography align='left' sx={{ flexGrow: 1 }}></Typography>
                    <div className="verticalLine">
                    </div>
                    <Box>
                        <Button type='submit' href='' style={{ color: "black" }}>
                            <Notifications />
                        </Button>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={{
                            xs: 0.5,
                            sm: 1,
                        }}
                        sx={{ margin: 3 }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Button size="large" style={{ color: "black" }} onClick={(event) => handleClick(event)} >
                                <Person />
                            </Button>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                PaperProps={{
                                    sx: {
                                        p: 1,
                                        width: 180,
                                        '& .MuiMenuItem-root': {
                                            px: 1,
                                            py: 1,
                                            typography: 'body2',
                                            borderRadius: 0.75,
                                        },
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '& .MuiTypography-root': {
                                            fontSize: "15px",
                                            color: "black"
                                        },
                                    },
                                }}
                            >
                                <Link style={{ textDecoration: 'none' }} to={'/loginuser'}>
                                    <MenuItem >
                                        <Avatar sx={{ bgcolor: purple[500] }}>{user.user.username.charAt(0).toUpperCase()}</Avatar>
                                        <Typography style={{ color: "black" }}>{user.user.username}</Typography>
                                    </MenuItem>
                                </Link>
                                <Divider />
                                <Link style={{ textDecoration: 'none' }} to={'/storagePost'}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Favorite style={{ color: "red" }} fontSize="small" />
                                        </ListItemIcon>
                                        <Typography>Bài Viết Đã Lưu</Typography>
                                    </MenuItem>
                                </Link>
                                <MenuItem className="navbar-logout" onClick={(e) => dispatch(logOutUser())}>
                                    <ListItemIcon>
                                        <Logout style={{ color: "red" }} fontSize="small" />
                                    </ListItemIcon >
                                    <Typography> Đăng Xuất</Typography>
                                </MenuItem>
                            </Popover>
                        </Box>
                    </Stack>
                </Toolbar>
            </StyledRoot>
            <Typography style={{fontSize:"30px", fontWeight:"bold"}}>Bài Viết Đã Lưu</Typography>
            {posts.map((post: any) =>
                <FeedStoragePost post={post} key={post._id} />) ?? (
                    <p>No FeedContent Found.</p>
                )}
        </>
    );
};

export default StoragePost;
