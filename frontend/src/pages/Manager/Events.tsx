import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";

import { Button, Container, Typography, Stack, Card, Popover, Box, Toolbar } from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';


import { Link } from 'react-router-dom';
import UpdateEvent from "pages/Manager/UpdateEvent";
const Posts: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const [anchorEl, setAnchorEl] = React.useState([null]);
    const manager = useSelector((state: RootState) => state.manager);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    function formatDate(input: any) {
        var datePart = input.match(/\d+/g),
            year = datePart[0].substring(0),
            month = datePart[1], day = datePart[2];

        return day + '/' + month + '/' + year;
    }

    React.useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            manager?.events?.filter((event: any) =>
                event.nameEvent || event.poster || event.approver || event.comments || event.quantityUser
                || event.job || event.location || event.departmentEvent || event.costs || event.dayStart
                || event.dayEnd || event.image
            ));
    }, [manager]);

    const handleOpenMenu = (event: any, index: any) => {
        const newAnchorEls = [
            ...anchorEl.slice(0, index),
            event.currentTarget,
            ...anchorEl.slice(index + 1)
        ];
        setAnchorEl(newAnchorEls);
    };

    const handleCloseMenu = (index: any) => {
        const newAnchorEls = [
            ...anchorEl.slice(0, index),
            null,
            ...anchorEl.slice(index + 1)
        ];
        setAnchorEl(newAnchorEls);
    };

    React.useEffect(() => {
        document.title = "EVENT";
    }, []);

    return (
        <>

            <Box>
                <Typography variant="h4" gutterBottom>
                    Sự Kiện
                </Typography>

                <Box component={Link} to={'/event/newevent'}>Tạo Sự Kiện</Box>

            </Box>

            <Container>
                <Toolbar style={{ display: "flex", flexDirection: "column" }}>
                    {events.map((event: any, index) =>
                        <Box key={event._id}>
                            <Box>
                                <Card sx={{ maxWidth: 500, height: 493 }}>
                                    <Box>
                                        <Box>
                                            <Avatar sx={{ bgcolor: red[500] }} style={{ marginRight: "15px", width: '28px', height: '28px', fontSize: '13px' }}>
                                                {event?.poster.username.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Typography style={{ fontWeight: "bold", fontSize: '13px' }}>{event?.poster.username}</Typography>
                                        </Box>
                                        <Box flexGrow={1} />
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {event?.nameEvent ?? null}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {event?.quantityUser ?? null}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {event?.costs ?? null}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {event?.location ?? null}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {event?.dayStart ?? null}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {event?.dayEnd ?? null}
                                            </Typography>
                                        </CardContent>
                                    </Box>

                                    {/* {formatDate(post?.createdAt.slice(0, 10))} */}

                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={PF + event?.image ?? null}
                                        alt="Paella dish"
                                    />
                                </Card>
                                <Button style={{ backgroundColor: "black", color: "white", marginTop: "10px", height: "43px", width: "100px" }} onClick={(event) => handleOpenMenu(event, index)} >
                                    Cập Nhật
                                </Button>
                                <Popover
                                    open={!!anchorEl[index]}
                                    anchorEl={anchorEl[index]}
                                    onClose={() => handleCloseMenu(index)}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                        sx: {
                                            p: 1,
                                            width: 340,
                                            '& .MuiMenuItem-root': {
                                                px: 1,
                                                typography: 'body2',
                                                borderRadius: 0.75,
                                            },
                                        },
                                    }}
                                >
                                    <Box>
                                        <UpdateEvent event={event} key={event._id} />
                                    </Box>
                                </Popover>
                                <Button style={{ backgroundColor: "red", color: "white", marginTop: "10px", marginLeft: "10px", height: "43px", width: "100px" }} onClick={(e) => dispatch(deleteEvent(event._id))} >
                                    Xóa
                                </Button>
                            </Box>
                            <Box>
                                <Typography style={{ fontWeight: "bold" }}>Bình luận của Quản Lý Cấp Cao</Typography>
                            </Box>
                            {event.comments.map((comment: any) =>
                                <Box>
                                    <Card style={{ maxWidth: 400, height: 190, boxShadow: "none" }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar style={{ backgroundColor: "green" }} aria-label="recipe">
                                                    {comment.commenter.username.charAt(0).toUpperCase()}
                                                </Avatar>
                                            }
                                            title={comment.commenter.username}
                                        // subheader={formatDate(post.createdAt)}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" style={{ fontSize: "20px" }}>
                                                {comment.contentComment}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            )}
                        </Box>
                    )}
                </Toolbar>

            </Container>

        </>
    );
};

export default Posts;
