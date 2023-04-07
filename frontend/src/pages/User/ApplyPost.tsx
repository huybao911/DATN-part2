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
                                        width: 220,
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
                                <Link style={{ textDecoration: 'none' }} to={'/applyPost'}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Approval style={{ color: "black" }} fontSize="small" />
                                        </ListItemIcon>
                                        <Typography>Bài Viết Đã Ứng Tuyển</Typography>
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
            <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>Bài Viết Đã Ứng Tuyển</Typography>
            {posts.map((postApply: any) =>
                <FeedApplyPost postApply={postApply} key={postApply._id} />) ?? (
                    <p>No FeedStoragePost Found.</p>
                )}
        </>
    );
};

export default StoragePost;
