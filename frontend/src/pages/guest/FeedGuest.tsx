import * as React from 'react';
import { makeStyles, styled } from "@material-ui/core/styles";

import { AppBar, Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Toolbar, Stack, Typography, Popover, ListItemIcon, Divider } from '@mui/material';
import { MoreVert, PersonAdd, Person } from '@mui/icons-material';
import { Button } from "@material-ui/core";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { green } from '@mui/material/colors';
import { Box } from '@mui/material';

import { StyledMenuItem } from '../../layouts/navigation/style'
import { Link } from "react-router-dom";

import { formatDistance } from 'date-fns';

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'white',
    fontWeight: 'bold',
}));
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

const FeedContent: React.FC<Props> = ({ event }): JSX.Element => {

    const [value, setValue] = React.useState('1');

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const textAvatar = event?.poster.username ?? null;
    const letterAvatar = textAvatar.charAt(0).toUpperCase();

    const lettercreatedAt = (formatDistance(new Date(event?.created_at), Date.now(), { addSuffix: true })).split("about");

    const classes = useStyles();

    return (
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

                                    <StyledMenuItem component={Link} to={'/register'} >
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
                                        title={event?.poster.username ?? null}
                                        titleTypographyProps={{ align: 'left', fontSize: '16px', fontWeight: 'bold', paddingBottom: '2px' }}
                                        subheader={lettercreatedAt}
                                        subheaderTypographyProps={{ align: 'left', fontSize: '12px' }}
                                    >
                                    </CardHeader>

                                    <CardContent>
                                        <Typography sx={{ textAlign: 'left', fontSize: '24px', fontWeight: "bold" }}>
                                            {event?.nameEvent ?? null}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                            {event?.quantityUser ?? null}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                            {event?.location ?? null}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                            {event?.dayStart ?? null}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
                                            {event?.dayEnd ?? null}
                                        </Typography>
                                    </CardContent >
                                    <CardMedia
                                        className={classes.myMedia}
                                        component="img"
                                        image={PF + event?.image ?? null}
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
    );
};

export default FeedContent;
