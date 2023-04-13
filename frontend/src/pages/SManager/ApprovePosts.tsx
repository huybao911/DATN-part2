import * as React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostApprove, deleteComment } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import { Card, CardMedia, CardContent, Avatar, Toolbar, Typography, Button, Box, Container } from "@material-ui/core";

import { approvePost } from "redux/actions/sManager";
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

const ApprovePosts: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [posts, setPosts] = React.useState<IPost[]>([]);
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
        dispatch(getPostApprove());
    }, [dispatch]);

    React.useEffect(() => {
        setPosts(() =>
            smanager?.posts?.filter((post: any) =>
                post.title || post.content || post.image || post.poster || post.comments
            ));
    }, [smanager]);

    React.useEffect(() => {
        document.title = "APPROVE POST";
    }, []);

    return (
        <Container >
            <StyledRoot style={{ display: "flex", flexDirection: "column" }}>
                {posts.map((post: any) =>
                    <Box key={post._id} >
                        <Box style={{ padding: "20px" }}>
                            <Card style={{ boxShadow: "none", padding: "30px", borderRadius: "24px" }}>
                                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
                                    <Box boxShadow={2}
                                        style={{
                                            display: "flex", flexDirection: "row", alignItems: "center",
                                            padding: "6px 16px", borderRadius: "40px",
                                        }}>
                                        <Avatar style={{ backgroundColor: "green", marginRight: "15px", width: '28px', height: '28px', fontSize: '13px' }}>
                                            {post.poster.username.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Typography style={{ fontWeight: "bold", fontSize: '13px' }}>{post.poster.username}</Typography>
                                    </Box>
                                    <Box flexGrow={1} />
                                    <Button
                                        style={{
                                            display: "flex", margin: "auto", color: "green",
                                            textTransform: "capitalize", marginTop: "20px",
                                        }}
                                        className={classes.btnLogin}
                                        size='medium'
                                        onClick={(e) => dispatch(approvePost(post._id))}><CheckIcon style={{ width: '18px' }} />
                                    </Button>
                                </Box>
                                <CardMedia
                                    component="img"
                                    image={PF + post.image}
                                    alt="Không có ảnh"
                                    style={{ width: "440px" }}
                                />
                                <CardContent style={{ width: "400px" }} >
                                    <Typography style={{ fontWeight: "bold", fontSize: "13px", width: "470px" }}>
                                        {post.title}
                                    </Typography>
                                    <Typography style={{ width: "470px", fontSize: "12px" }}>
                                        {post.content}
                                    </Typography>
                                    <Typography style={{ fontSize: "12px", color: "#6a7b78", padding: "12px 0px" }}>{convertTZ((post.createdAt), "Asia/Bangkok")}</Typography>
                                </CardContent>
                                {post.comments.map((comment: any) =>
                                    <Box style={{ marginTop: "6px" }}>
                                        <Card style={{ boxShadow: "none",   }}>
                                            <Box style={{ display: "flex", flexDirection: "row", paddingLeft: '20px'}}>
                                                <Avatar style={{ backgroundColor: "green", marginRight: "10px",marginTop: "10px", width: '28px', height: '28px', fontSize: '13px' }} aria-label="recipe">
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
                                                    onClick={(e) => dispatch(deleteComment(post._id, comment._id))}> <DeleteForeverIcon style={{ width: '18px' }} />
                                                </Button>
                                            </Box>
                                        </Card>
                                    </Box>
                                )}
                                <UpdateComment post={post} />
                            </Card>
                        </Box>
                    </Box>
                )}
            </StyledRoot>
        </Container>
    );
};

export default ApprovePosts;
