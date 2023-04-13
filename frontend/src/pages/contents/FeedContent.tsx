import * as React from 'react';
import { makeStyles, styled } from "@material-ui/core/styles";

import { AppBar, Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Rating, Toolbar, Stack, Typography, Popover, ListItemIcon, Divider } from '@mui/material';
import { Favorite, FavoriteBorder, MoreVert, PersonAdd, Person } from '@mui/icons-material';
import { Button } from "@material-ui/core";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { green } from '@mui/material/colors';
import { Box } from '@mui/material';
import { storagePost, unstoragePost, applyJob, unapplyJob } from "redux/actions/user";

import { StyledMenuItem } from '../../layouts/navigation/style'
import { Link } from "react-router-dom";

import { formatDistance } from 'date-fns';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'white',
    fontWeight: 'bold',
}));
type Props = {
    post: any;
};

const useStyles = makeStyles((theme) => ({
    toolBar: {
        dislay: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    toolbarContent: {
        justifyContent: 'center',
        backgroundColor: 'none',
        flexDirection: 'column',
        marginBottom: 'auto'
    },
    card: {
        borderRadius: '12px',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '500px',
        height: '500px',
    },
    myMedia: {
        height: "250px",
        // paddingTop: '56.25%', // 16:9,
    },
    cardHold: {
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '500px',
        height: '800px',
        borderRadius: '12px',
    },
    button: {
        backgroundColor: '#CBB7F5',
        color: '#434343',
        height: '40px',
        width: '100px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'none',
        margin: '7px 0px 0px 10px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: '#808080',
    },
    toolbarTitle: {
        justifyContent: 'center',
        paddingTop: '11px',
        backgroundColor: 'white',
        maxWidth: '100%'
    },
    box: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    tabClick: {
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: 50,
            width: '100%',
            backgroundColor: '#F8D6A4',
            borderRadius: 4
        },
        "& .MuiTab-root.Mui-selected": {
            color: 'black'
        }
    },
    tab: {
        textTransform: 'none',
        fontFamily: '',
        fontSize: '16px',
        borderRadius: 2,
        fontWeight: 'bold',
    }

}));

const FeedContent: React.FC<Props> = ({ post }): JSX.Element => {

    const dispatch = useDispatch();
    const [value, setValue] = React.useState('1');

    const [clicked, setClicked] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleClickStorage() {
        dispatch(storagePost(post._id));
    }

    function handleClickUnStorage() {
        dispatch(unstoragePost(post._id));
    }

    const [clickedApply, setClickedApply] = React.useState(true);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const textAvatar = post?.poster.username ?? null;
    const letterAvatar = textAvatar.charAt(0).toUpperCase();

    const lettercreatedAt = (formatDistance(new Date(post?.createdAt), Date.now(), { addSuffix: true })).split("about");

    const classes = useStyles();

    const user = useSelector((state: RootState) => state.user);

    const bottomLinks = user.isAuthenticated ? (
        <Toolbar className={classes.toolBar}>
            <Box className={classes.toolbarContent}>
                <TabContext value={value}>
                    <TabPanel value="1" >
                        {/* de rieng ra 1 component */}
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                                        {letterAvatar}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label='settings'>
                                        <MoreVert />
                                    </IconButton>
                                }
                                title={post?.poster.username ?? null}
                                titleTypographyProps={{ align: 'left', fontSize: '16px', fontWeight: 'bold', paddingBottom: '2px' }}
                                subheader={lettercreatedAt}
                                subheaderTypographyProps={{ align: 'left', fontSize: '12px' }}
                            >
                            </CardHeader>

                            <CardContent>
                                <Typography sx={{ textAlign: 'left', fontSize: '24px', fontWeight: "bold" }}>
                                    {post?.title ?? null}
                                </Typography>
                                <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                    {post?.content ?? null}
                                </Typography>
                            </CardContent >
                            <CardMedia
                                className={classes.myMedia}
                                component="img"
                                image={PF + post?.image ?? null}
                                alt="Paella dish"
                            >
                            </CardMedia>

                            <CardActions disableSpacing >
                                <IconButton onClick={() => setClicked(!clicked)} sx={{ border: '0px solid black', backgroundColor: '#D9D9D9', borderRadius: '4px' }} >
                                    {clicked ? <Favorite onClick={handleClickUnStorage} sx={{ fontSize: '24px', color: 'red' }} /> : <FavoriteBorder onClick={handleClickStorage} sx={{ fontSize: '24px', color: 'red' }} />}
                                    {/* <button onClick={(e) => dispatch(storagePost(post._id))}>Like</button>:<button>Unlike</button> */}
                                </IconButton>

                                <IconButton>
                                    <Rating />
                                </IconButton>

                                <IconButton onClick={() => setClickedApply(!clickedApply)} sx={{ border: '0px solid black', backgroundColor: '#D9D9D9', borderRadius: '4px' }} >
                                    {clickedApply ? <button style={{ backgroundColor: "black", color: "white", height: "30px", width: "90px", fontWeight: "bold", borderRadius: "6px" }} onClick={(e) => dispatch(applyJob(post._id))}>Ứng Tuyển</button> : <button style={{ backgroundColor: "red", color: "white", height: "30px", width: "90px", fontWeight: "bold", borderRadius: "6px" }} onClick={(e) => dispatch(unapplyJob(post._id))}>Hủy Ứng Tuyển</button>}
                                </IconButton>

                            </CardActions>

                            <Collapse>
                            </Collapse>

                        </Card>
                    </TabPanel>
                </TabContext>

            </Box>
        </Toolbar >
    ) : (
        <Box>
            <Box>
                <StyledRoot style={{ boxShadow: "none" }} >
                    <Toolbar>
                        <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
                        <Typography align='left' sx={{ flexGrow: 1 }}></Typography>
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
                                <Button size="large" onClick={(event) => handleClick(event)} >
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
                                            },
                                        },
                                    }}
                                >
                                    <StyledMenuItem component={Link} to={'/loginuser'} >
                                        <Avatar>G</Avatar>
                                        <Typography style={{ color: "black" }}>Tài Khoản</Typography>
                                    </StyledMenuItem>

                                    <Divider />

                                    <StyledMenuItem component={Link} to={'/loginuser'} >
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                        <Typography style={{ color: "black" }}>Đăng Ký</Typography>
                                    </StyledMenuItem>
                                </Popover>
                            </Box>
                        </Stack>
                    </Toolbar>
                </StyledRoot>
            </Box>
            <Box>
                <Toolbar className={classes.toolBar}>
                    <Box className={classes.toolbarContent}>
                        <TabContext value={value}>
                            <TabPanel value="1" >
                                {/* de rieng ra 1 component */}
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                                                {letterAvatar}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label='settings'>
                                                <MoreVert />
                                            </IconButton>
                                        }
                                        title={post?.poster.username ?? null}
                                        titleTypographyProps={{ align: 'left', fontSize: '16px', fontWeight: 'bold', paddingBottom: '2px' }}
                                        subheader={lettercreatedAt}
                                        subheaderTypographyProps={{ align: 'left', fontSize: '12px' }}
                                    >
                                    </CardHeader>

                                    <CardContent>
                                        <Typography sx={{ textAlign: 'left', fontSize: '24px', fontWeight: "bold" }}>
                                            {post?.title ?? null}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                            {post?.content ?? null}
                                        </Typography>
                                    </CardContent >
                                    <CardMedia
                                        className={classes.myMedia}
                                        component="img"
                                        image={PF + post?.image ?? null}
                                        alt="Paella dish"
                                    >
                                    </CardMedia>
                                </Card>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Toolbar >
            </Box>
        </Box>
    )

    return (
        <>
            {bottomLinks}
            {/* trang nay la trang can giu lai position={'fixed'} overflow='hidden'*/}
            {/* <Box sx={{ marginBottom: 'auto', flexDirection: 'column', zIndex: '1' }} >

                    <TabContext value={value}>

                        <TabPanel value="1" sx={{ margin: '0' }}> */}
            {/* de rieng ra 1 component */}
            {/* <Card className={classes.cardHold}>
                                <CardHeader
                                    title='Đây là tên bài viết chi tiết'
                                    titleTypographyProps={{ align: 'left' }}
                                >

                                </CardHeader> */}

            {/* day la thanh ngach ngang phan cach */}
            {/* <Box sx={{ maxWidth: '100%', height: '1px', width: '100%', backgroundColor: '#E8E8E8' }}>

                                </Box>

                                <CardActions>
                                    <Button className={classes.button} > Ứng tuyển </Button>
                                </CardActions>

                            </Card>
                        </TabPanel>
                    </TabContext>
                </Box> */}
        </>
    );
};

export default FeedContent;
