import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, deleteEvent } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IEvent } from "redux/types/event";
import UpdateEvent from "pages/Manager/UpdateEvent";
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import { Box as BoxButton } from '@mui/material';

import { Button, Container, Typography, Card, CardContent, CardMedia, Box, Popover, Avatar, CardHeader, Grid, Divider } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Posts: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const StyledRoot = styled(Card)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: theme.spacing(3, 3, 0, 3),
        flexDirection: "column",
        color: 'black',
        marginTop: "40px",
        margin: '0px 100px',
        paddingBottom: "40px",
        paddingLeft: '50px',
        paddingRight: '50px',
        borderRadius: "22px",
        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
    }));

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const [anchorEl, setAnchorEl] = React.useState([null]);
    const manager = useSelector((state: RootState) => state.manager);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // function formatDate(input: any) {
    //     var datePart = input.match(/\d+/g),
    //         year = datePart[0].substring(0),
    //         month = datePart[1], day = datePart[2];

    //     return day + '/' + month + '/' + year;
    // }

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
        document.title = "Event | Manager";
    }, []);

    return (

        <Container style={{ color: '#rgb(33, 43, 54)' }}>
            <Box style={{ display: "flex", flexDirection: "row" }}>
                <Box style={{ margin: '0px 100px', }}>
                    <Typography gutterBottom style={{ color: "black", fontSize: "20px", fontWeight: 'bold' }}>
                        Danh Sách Sự Kiện
                    </Typography>
                </Box>
                <Box flexGrow={1} />
                <BoxButton component={Link} to='/event/newevent' style={{ fontSize: '14px', textDecoration: "none", color: "black", marginRight: "100px" }}>
                    <Box style={{
                        border: '1px solid rgba(158, 158, 158, 0.32)',
                        borderRadius: '10px', textAlign: 'center',
                        marginTop: '0.5px', padding: '11px', color: "white", backgroundColor: '#00ab55',
                        width: 140, display: 'flex', flexDirection: 'row', justifyContent: 'center'
                    }}>
                        <AddIcon style={{ width: '16px', color: "white", marginRight: "12px" }} />
                        <Typography style={{ fontSize: '14px', paddingTop: "2.5px" }} >
                            Tạo Sự Kiện
                        </Typography>
                    </Box>
                </BoxButton>
            </Box>
            <StyledRoot style={{ display: "flex", flexDirection: "column" }}>
                {events.map((event: any, index) =>
                    <Box key={event._id}>

                        <Box style={{ fontSize: '34px', lineHeight: 3, fontWeight: '700', letterSpacing: 0.4 }}>
                            {event?.nameEvent ?? null}
                        </Box>

                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>

                            <Box
                                style={{
                                    display: "flex", flexDirection: "row", alignItems: "center",
                                    borderRadius: "40px",
                                }}>
                                <Avatar style={{ backgroundColor: "red", marginRight: "15px", width: '30px', height: '30px', fontSize: '13px' }}>
                                    {event.poster.username.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography style={{ fontWeight: "600", fontSize: '15px' }}>{event.poster.username}</Typography>
                                    <Typography style={{ fontWeight: "400", fontSize: '13px', color: 'rgb(145, 158, 171)' }}>{event.poster.department.nameDepartment}</Typography>
                                </Box>
                            </Box>
                            <Box flexGrow={1} />
                            <Box>
                                <Button style={{ color: "white", backgroundColor: '#00ab55', marginRight: 20, textTransform: 'capitalize', borderRadius: '10px', padding: '4px 12px', fontSize: '12px' }} onClick={(event) => handleOpenMenu(event, index)}  >
                                    <RefreshIcon style={{ width: "16px", marginRight: '4px', fontWeight: '600' }} />
                                    Cập nhật
                                </Button>
                                <Popover
                                    open={!!anchorEl[index]}
                                    anchorEl={anchorEl[index]}
                                    onClose={() => handleCloseMenu(index)}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                    }}
                                >
                                    <Box>
                                        <UpdateEvent event={event} key={event._id} />
                                    </Box>
                                </Popover>
                            </Box>
                            <Button style={{ color: "white", backgroundColor: '#FF5630', textTransform: 'capitalize', borderRadius: '10px', fontSize: '12px', padding: '4px 12px' }} onClick={(e) => dispatch(deleteEvent(event._id))} >
                                <ClearIcon style={{ width: "16px", marginRight: '4px' }} />
                                Xóa
                            </Button>
                        </Box>

                        <Divider style={{ margin: '30px 0px' }} />
                        <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                            Nội dung
                        </Typography>
                        <Box style={{ fontSize: '13px' }}>{event.contentEvent}</Box>
                        {/* Picture */}
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 40, }}>
                            <CardMedia
                                component="img"
                                alt="Paella dish"
                                src={PF + event?.image ?? null}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '14px'
                                }}
                            />
                        </Box>

                        <Divider style={{ margin: '30px 0px' }} />

                        <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                            Chi tiết sự kiện
                        </Typography>

                        {/* detail word */}
                        <Box style={{ marginTop: 20, fontSize: '13px' }}>
                            <Grid container item={true} justifyContent="center"
                                spacing={4}
                                xs={12}
                            >

                                <Grid item xs={4}>
                                    <Box style={{ color: 'rgb(145, 158, 171)', paddingBottom: '10px', textTransform: 'uppercase' }}>Công việc</Box>
                                    {event.job.map((job: any) =>
                                        <Box key={job._id} style={{ padding: '2px 0px' }}>
                                            • {job.nameJob}
                                        </Box>
                                    )}
                                </Grid>

                                <Grid item xs={4} >
                                    <Box style={{ color: 'rgb(145, 158, 171)', paddingBottom: '10px', textTransform: 'uppercase' }}>Số lượng</Box>
                                    <Box>
                                        {event?.quantityUser ?? null}
                                    </Box>
                                </Grid>

                                <Grid item xs={4} >
                                    <Box style={{ color: 'rgb(145, 158, 171)', paddingBottom: '10px', textTransform: 'uppercase' }}>Tổng tiền</Box>
                                    <Box>
                                        {new Intl.NumberFormat().format(event.costs)} VND
                                    </Box>
                                </Grid>

                                <Grid item xs={4}>
                                    <Box style={{ color: 'rgb(145, 158, 171)', paddingBottom: '10px', textTransform: 'uppercase' }}>Địa chỉ</Box>
                                    <Box>
                                        {event?.location ?? null}
                                    </Box>
                                </Grid>

                                <Grid item xs={4} >
                                    <Box style={{ color: 'rgb(145, 158, 171)', paddingBottom: '10px', textTransform: 'uppercase' }}>Ngày bắt đầu</Box>
                                    <Box>
                                        {event?.dayStart ?? null}
                                    </Box>
                                </Grid>

                                <Grid item xs={4} >
                                    <Box style={{ color: 'rgb(145, 158, 171)', paddingBottom: '10px', textTransform: 'uppercase' }}>Ngày kết thúc</Box>
                                    <Box>
                                        {event?.dayEnd ?? null}
                                    </Box>
                                </Grid>

                                {/* <Grid item xs={4} style={{ textAlign: "center" }}>
                                        <Box>Ngày kết thúc</Box>
                                        <Box>
                                            {event?.dayEnd ?? null}
                                        </Box>
                                    </Grid> */}
                            </Grid>
                        </Box>

                        <Divider style={{ margin: '30px 0px' }} />

                        {/* comment */}
                        <Typography gutterBottom style={{ color: "black", fontSize: "16px", fontWeight: '600' }}>
                            Bình luận
                        </Typography>

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
            </StyledRoot>

        </Container>

    );
};

export default Posts;
