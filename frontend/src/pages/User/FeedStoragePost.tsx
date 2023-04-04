import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Rating, Toolbar, Typography, ListItem } from '@mui/material';
import { ArrowRight, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { green } from '@mui/material/colors';
import { Box } from '@mui/material';
import { storagePost, unstoragePost } from "redux/actions/user";

import { useDispatch } from "react-redux";

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
        height: "282px",
        // paddingTop: '56.25%', // 16:9,
        marginTop: '30'
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

const FeedStoragePost: React.FC<Props> = ({ post }): JSX.Element => {

    const dispatch = useDispatch();
    const [value, setValue] = React.useState('1');

    const [clicked, setClicked] = React.useState(true);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const textAvatar = post?.poster.username ?? null;
    const letterAvatar = textAvatar.charAt(0).toUpperCase();

    const textcreatedAt = post?.createdAt ?? null;
    const lettercreatedAt = textcreatedAt.slice(0, 10);

    function formatDate(input: any) {
        var datePart = input.match(/\d+/g),
            year = datePart[0].substring(0),
            month = datePart[1], day = datePart[2];

        return day + '/' + month + '/' + year;
    }

    const classes = useStyles();

    return (
        <>
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
                                    subheader={formatDate(lettercreatedAt)}
                                    subheaderTypographyProps={{ align: 'left', fontSize: '12px' }}
                                >
                                </CardHeader>

                                <CardContent>
                                <Typography sx={{ textAlign: 'left', fontSize: '24px', fontWeight:"bold" }}>
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

                                <CardActions style={{marginTop:"10px"}} disableSpacing >
                                        <IconButton onClick={() => setClicked(!clicked)} sx={{ border: '0px solid black', backgroundColor: '#D9D9D9', borderRadius: '4px' }} >
                                            {clicked  ? <FavoriteBorder onClick={(e) => dispatch(storagePost(post._id))}  sx={{ fontSize: '24px', color: 'red' }} /> : <Favorite onClick={(e) => dispatch(unstoragePost(post._id))} sx={{ fontSize: '24px', color: 'red' }} />}
                                            {/* <button onClick={(e) => dispatch(storagePost(post._id))}>Like</button>:<button>Unlike</button> */}
                                        </IconButton>

                                        <IconButton>
                                            <Rating />
                                        </IconButton>

                                        <IconButton sx={{ ml: 'auto' }}>
                                            <ArrowRight />
                                        </IconButton>

                                </CardActions>

                                <Collapse>
                                </Collapse>

                            </Card>
                        </TabPanel>
                    </TabContext>

                </Box>
            </Toolbar >
        </>
    );
};

export default FeedStoragePost;
