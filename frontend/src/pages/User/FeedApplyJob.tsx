import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card, CardContent, CardHeader, CardMedia, Collapse, IconButton, Toolbar, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { green } from '@mui/material/colors';
import { Box } from '@mui/material';
import { formatDistance } from 'date-fns';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

type Props = {
    event: any;
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

const FeedApplyJob: React.FC<Props> = ({ event }): JSX.Element => {
    
    const [value, setValue] = React.useState('1');

    const user = useSelector((state: RootState) => state.user);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const textAvatar = event?.poster.username ?? null;
    const letterAvatar = textAvatar.charAt(0).toUpperCase();

    const lettercreatedAt = (formatDistance(new Date(event?.created_at), Date.now(), { addSuffix: true })).split("about");

    const classes = useStyles();

    const findJobUserApply = event.usersApplyJob.filter((userapply: any) => userapply.userApply.username === user.user.username);

    // const applySuccess = jobApply.notiApplyJob == "Bạn đã ứng tuyển thành công" ? (
    //     <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
    //         {jobApply?.jobId.jobDescription}
    //     </Typography>
    // ) : null
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
                                    title={event?.poster.username ?? null}
                                    titleTypographyProps={{ align: 'left', fontSize: '16px', fontWeight: 'bold', paddingBottom: '2px' }}
                                    subheader={lettercreatedAt}
                                    subheaderTypographyProps={{ align: 'left', fontSize: '12px' }}
                                >
                                </CardHeader>

                                <CardContent>

                                    {findJobUserApply.map((job: any) =>
                                        <Box>
                                            <Box>
                                                <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                                    {job?.jobEvent.nameJob ?? null}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                                    {job?.notiApplyJob ?? null}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                    {/* {applySuccess} */ }
                                </CardContent>

                                <CardMedia
                                    className={classes.myMedia}
                                    component="img"
                                    image={PF + event?.image ?? null}
                                    alt="Paella dish"
                                >
                                </CardMedia>
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

export default FeedApplyJob;
