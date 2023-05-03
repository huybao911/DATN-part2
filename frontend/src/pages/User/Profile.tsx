import * as React from "react";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IUser } from "redux/types/user";
import UpdateProfile from "pages/User/UpdateProfile";
import { Grid, Paper, Button, AppBar, Box, Typography, Avatar, ListItemIcon } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { purple } from '@mui/material/colors';

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'black',
    fontWeight: 'bold',
}));
const Item = styled(Paper)(({ theme }) => ({
    margin: '0px 10px',
    height: '500px',
    textAlign: 'center',
    backgroundColor: '#eeeeee',
    boxShadow: 'none',

}));

const StoragePost: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [users, setUsers] = React.useState<IUser[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    React.useEffect(() => {
        setUsers(() =>
            user?.users?.filter((user: any) =>
                user.username || user.email || user.department || user.fullName || user.birthday || user.mssv || user.classUser || user.phone || user.address
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
        document.title = "PROFILE";
    }, []);

    return (
            <Box sx={{ backgroundColor: "#eeeeee" }}>
                <Grid container spacing={2} style={{ padding: "80px 150px", backgroundColor: 'white' }}>
                    <Grid xs={3}>
                        <Item>
                            <Box sx={{ height: "20px" }}></Box>
                            <Box sx={{ textAlign: "-webkit-center" }}>
                                <Avatar sx={{ bgcolor: purple[500], padding: "50px", fontSize: "40px" }}>{user.user.username.charAt(0).toUpperCase()}</Avatar>
                            </Box>
                            <Typography style={{ color: "black", fontSize: "27px", fontWeight: "bold", marginTop: "10px" }}>{user.user.username}</Typography>
                            <Typography style={{ color: "black", fontSize: "16px", marginTop: "10px" }}>Bio:</Typography>
                            <Typography style={{ color: "black", fontSize: "16px", marginTop: "50px" }}>Khoa: {user.getDepartment.nameDepartment}</Typography>
                            <Typography style={{ color: "black", fontSize: "16px" }}>Trường Đại Học HUTECH</Typography>
                            <Link style={{ textDecoration: 'none', textAlign: "center" }} to={'/storagePost'}>
                                <Button style={{ backgroundColor: "black", color: "white", paddingLeft: "50px", marginTop: "20px" }}>
                                    <Typography style={{ paddingRight: "5px" }}>Bài Viết Đã Lưu</Typography>
                                    <br></br>
                                    <ListItemIcon>
                                        <Favorite style={{ color: "red" }} fontSize="small" />
                                    </ListItemIcon>
                                </Button>
                            </Link>
                        </Item>
                    </Grid>
                    <Grid xs={9}>
                        <Item style={{ textAlign: "left", paddingLeft: "15px" }}>
                            {users.map((user: any) =>
                                <UpdateProfile user={user} key={user._id} />) ?? (
                                    <p>No User Found.</p>
                                )}
                        </Item>
                    </Grid>
                </Grid>
            </Box>
    );
};

export default StoragePost;
