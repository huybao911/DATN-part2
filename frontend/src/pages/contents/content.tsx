import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Rating, Toolbar, Typography } from '@mui/material';
import { ArrowRight, Favorite,  MoreVert } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import { Box } from '@mui/material';

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
        height: '480px',
    },
    myMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
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

const Content: React.FC = (): JSX.Element => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

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
                                 
                                    action={
                                        <IconButton aria-label='settings'>
                                            <MoreVert />
                                        </IconButton>
                                    }
                                    title='Đây là tên bài viết'
                                    titleTypographyProps={{ align: 'left', fontSize: '16px', fontWeight: 'bold', paddingBottom: '2px' }}
                                    subheader='Đây là ngày đăng bài'
                                    subheaderTypographyProps={{ align: 'left', fontSize: '12px' }}
                                >
                                </CardHeader>

                                <CardMedia
                                    className={classes.myMedia}
                                >
                                </CardMedia>

                                <CardContent>
                                    <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                        Đây là nội dung bài viết
                                    </Typography>
                                </CardContent >

                                <CardActions disableSpacing >

                                    <IconButton sx={{ border: '0px solid black', backgroundColor: '#D9D9D9', borderRadius: '4px' }} >
                                        <Favorite sx={{ fontSize: '24px', color: 'black' }} />
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


                {/* trang nay la trang can giu lai position={'fixed'} overflow='hidden'*/}
                <Box sx={{ marginBottom: 'auto', flexDirection: 'column', zIndex: '1' }} >

                    <TabContext value={value}>

                        <TabPanel value="1" sx={{ margin: '0' }}>
                            {/* de rieng ra 1 component */}
                            <Card className={classes.cardHold}>
                                <CardHeader
                                    title='Đây là tên bài viết chi tiết'
                                    titleTypographyProps={{ align: 'left' }}
                                >

                                </CardHeader>

                                {/* day la thanh ngach ngang phan cach */}
                                <Box sx={{ maxWidth: '100%', height: '1px', width: '100%', backgroundColor: '#E8E8E8' }}>

                                </Box>

                                <CardActions>
                                    <Button className={classes.button} > Ứng tuyển </Button>
                                </CardActions>

                            </Card>
                        </TabPanel>
                    </TabContext>
                </Box>

            </Toolbar>
        </>
    );
};

export default Content;
