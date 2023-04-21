import * as React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getEventApprove, deleteComment } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import { Card, CardMedia, CardContent, Avatar, Toolbar, Typography, Button, Box, Container } from "@material-ui/core";

import { approveEvent } from "redux/actions/sManager";
import UpdateComment from "pages/SManager/UpdateComment";

import { formatDistance } from 'date-fns';

import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles((theme) => ({
    btnLogin: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
}));

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    justifyContent: 'center',
    padding: theme.spacing(0, 3, 0, 3),
}));

const ApproveEvents: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const smanager = useSelector((state: RootState) => state.smanager);

    function formatDate(input: any) {
        var datePart = input.match(/\d+/g),
            year = datePart[0].substring(0),
            month = datePart[1], day = datePart[2], hour = datePart[3], minute = datePart[4];
        var ampm = hour >= 12 ? 'PM' : 'AM';

        return hour + ':' + minute + ' ' + ampm + ' ' + ' ' + day + '/' + month + '/' + year;
    }

    function convertTZ(date: any, tzString: any) {
        return new Date(date).toLocaleString("en-TT", { timeZone: tzString });
    }


    React.useEffect(() => {
        dispatch(getEventApprove());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            smanager?.events?.filter((event: any) =>
                event.poster || event.approver || event.comments || event.quantityUser || event.job || event.location || event.departmentEvent || event.costs || event.dayStart || event.dayEnd || event.image || event.created_at
            ));
    }, [smanager]);

    React.useEffect(() => {
        document.title = "APPROVE EVENT";
    }, []);

    return (
        <Container >
            <StyledRoot style={{ display: "flex", flexDirection: "column" }}>
                {events.map((event: any) =>
                    <Box key={event._id} >
                        <Box style={{ padding: "20px" }}>
                            <Card style={{ boxShadow: "none", padding: "30px", borderRadius: "24px" }}>
                                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                                    <Box boxShadow={2}
                                        style={{
                                            display: "flex", flexDirection: "row", alignItems: "center",
                                            padding: "6px 16px", borderRadius: "40px",
                                        }}>
                                        <Avatar style={{ backgroundColor: "green", marginRight: "15px", width: '28px', height: '28px', fontSize: '13px' }}>
                                            {event.poster.username.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Typography style={{ fontWeight: "bold", fontSize: '13px' }}>{event.poster.username}</Typography>
                                    </Box>
                                    <Box flexGrow={1} />
                                    <Button
                                        style={{
                                            display: "flex", margin: "auto", color: "green",
                                            textTransform: "capitalize", marginTop: "20px",
                                        }}
                                        className={classes.btnLogin}
                                        size='medium'
                                        onClick={(e) => dispatch(approveEvent(event._id))}><CheckIcon style={{ width: '18px' }} />
                                    </Button>
                                </Box>
                                <CardMedia
                                    component="img"
                                    image={PF + event.image}
                                    alt="Không có ảnh"
                                    style={{ width: "440px" }}
                                />
                                <CardContent style={{ width: "400px" }} >
                                    <Typography style={{ fontWeight: "bold", fontSize: "13px", width: "470px" }}>
                                        {event?.nameEvent}
                                    </Typography>
                                    <Typography style={{ width: "200px", fontSize: "12px" }}>
                                        Số lượng: {event.quantityUser}
                                    </Typography>
                                    <Typography style={{ width: "200px", fontSize: "12px" }}>
                                        Tổng chi phí: {new Intl.NumberFormat().format(event.costs)} VND
                                    </Typography>
                                    <Typography style={{ width: "200px", fontSize: "12px" }}>
                                        {event.location}
                                    </Typography>
                                    {event.job.map((job: any) =>
                                        <Typography key={job._id} style={{ width: "100px", fontSize: '12px' }}>
                                            - {job.nameJob}
                                        </Typography>
                                    )}
                                    <Typography style={{ width: "200px", fontSize: "12px" }}>
                                        {event.dayStart}
                                    </Typography>
                                    <Typography style={{ width: "200px", fontSize: "12px" }}>
                                        {event.dayEnd}
                                    </Typography>
                                    <Typography style={{ fontSize: "12px", color: "#6a7b78", padding: "12px 0px" }}>{convertTZ((event.created_at), "Asia/Bangkok")}</Typography>
                                </CardContent>
                                {event.comments.map((comment: any) =>
                                    <Box style={{ marginTop: "6px" }}>
                                        <Card style={{ boxShadow: "none", }}>
                                            <Box style={{ display: "flex", flexDirection: "row", paddingLeft: '20px' }}>
                                                <Avatar style={{ backgroundColor: "green", marginRight: "10px", marginTop: "10px", width: '28px', height: '28px', fontSize: '13px' }} aria-label="recipe">
                                                    {comment.commenter.username.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <CardContent style={{ backgroundColor: "#f4f5f5", padding: "10px 10px", borderRadius: "10px" }}>
                                                    <Box style={{ display: "flex", flexDirection: "row" }}>
                                                        <Typography style={{ fontWeight: "bold", fontSize: "13px", marginBottom: "5px" }}>{comment.commenter.username}</Typography>
                                                        <Box style={{ flexGrow: "1" }}></Box>
                                                        <Typography style={{ fontSize: '12px' }}>{(formatDistance(new Date(comment.created), Date.now(), { addSuffix: true })).split("about")}</Typography>
                                                    </Box>
                                                    <Typography style={{ fontSize: "12px", width: "260px", textAlign: "justify" }}>
                                                        {comment.contentComment}
                                                    </Typography>
                                                </CardContent>
                                                <Button
                                                    style={{ color: "red" }}
                                                    disableRipple
                                                    className={classes.btnLogin}
                                                    size='small'
                                                    onClick={(e) => dispatch(deleteComment(event._id, comment._id))}> <DeleteForeverIcon style={{ width: '18px' }} />
                                                </Button>
                                            </Box>
                                        </Card>
                                    </Box>
                                )}
                                <UpdateComment event={event} />
                            </Card>
                        </Box>
                    </Box>
                )}
            </StyledRoot>
        </Container>
    );
};

export default ApproveEvents;
