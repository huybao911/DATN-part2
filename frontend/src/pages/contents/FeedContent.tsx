import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Rating, Toolbar, Typography, ListItem } from '@mui/material';
import { ArrowRight, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { green } from '@mui/material/colors';
import { Box } from '@mui/material';
import { storagePost, unstoragePost, applyJob, unapplyJob } from "redux/actions/user";

import { formatDistance } from 'date-fns';

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";

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

    const [clicked, setClicked] = React.useState(true);

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
                                    {clicked ? <FavoriteBorder onClick={(e) => dispatch(storagePost(post._id))} sx={{ fontSize: '24px', color: 'red' }} /> : <Favorite onClick={(e) => dispatch(unstoragePost(post._id))} sx={{ fontSize: '24px', color: 'red' }} />}
                                    {/* <button onClick={(e) => dispatch(storagePost(post._id))}>Like</button>:<button>Unlike</button> */}
                                </IconButton>

                                <IconButton>
                                    <Rating />
                                </IconButton>

                                <IconButton onClick={() => setClickedApply(!clickedApply)} sx={{ border: '0px solid black', backgroundColor: '#D9D9D9', borderRadius: '4px' }} >
                                {clickedApply ?<button style={{backgroundColor:"black", color:"white", height:"30px", width:"90px",fontWeight:"bold",  borderRadius:"6px"}} onClick={(e) => dispatch(applyJob(post._id))}>Ứng Tuyển</button>:<button style={{backgroundColor:"red", color:"white", height:"30px", width:"90px",fontWeight:"bold", borderRadius:"6px"}} onClick={(e) => dispatch(unapplyJob(post._id))}>Hủy Ứng Tuyển</button>}
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
