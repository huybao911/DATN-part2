import * as React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostApprove, deleteComment } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import { Card, CardHeader, CardMedia, CardContent, Avatar, Toolbar, Typography, Button, Box, Container } from "@material-ui/core";

import { approvePost } from "redux/actions/sManager";
import UpdateComment from "pages/SManager/UpdateComment";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStyles = makeStyles((theme) => ({
    btnLogin: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: theme.spacing(1, 2),
    },
}));

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
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
        <Container>
            <StyledRoot>
                {posts.map((post: any) =>
                    <Box key={post._id} >
                        <Box style={{ padding: "30px" }} >
                            <Card style={{ boxShadow: "none", padding: "50px", borderTopLeftRadius: "24px", borderTopRightRadius: "24px" }}>
                                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Box boxShadow={2}
                                        style={{
                                            display: "flex", flexDirection: "row", alignItems: "center",
                                            padding: "14px 30px", borderRadius: "40px", marginBottom: "40px"
                                        }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar style={{ backgroundColor: "green" }}>
                                                    {post.poster.username.charAt(0).toUpperCase()}
                                                </Avatar>
                                            }
                                            style={{ padding: "0px" }}
                                        // title={post.poster.username}
                                        // subheader={formatDate(post.createdAt)}
                                        >

                                        </CardHeader>
                                        <Typography>{post.poster.username}</Typography>
                                    </Box>
                                </Box>
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={PF + post.image}
                                    alt="Không có ảnh"
                                    style={{ borderRadius: "12px" }}
                                />
                                <CardContent>
                                    <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
                                        {post.title}
                                    </Typography>
                                    <Typography style={{}}>
                                        {post.content}
                                    </Typography>
                                    <Typography style={{ fontSize: "16px", color: "#6a7b78", padding: "12px 0px" }}>{formatDate(post.createdAt)}</Typography>
                                </CardContent>
                                <Button
                                    style={{ display: "flex", margin: "auto", backgroundColor: "#FED049", color: "black", textTransform: "capitalize" }}
                                    size='small'
                                    className={classes.btnLogin}
                                    onClick={(e) => dispatch(approvePost(post._id))}>Duyệt Bài Viết
                                </Button>
                                {post.comments.map((comment: any) =>
                                    <Box style={{ marginTop: "20px" }}>
                                        <Card style={{ boxShadow: "none" }}>
                                            <Box style={{ display: "flex", flexDirection: "row" }}>
                                                
                                                <Avatar style={{ backgroundColor: "green", marginRight:"10px" }} aria-label="recipe">
                                                    {comment.commenter.username.charAt(0).toUpperCase()}
                                                </Avatar>

                                                <CardContent style={{ backgroundColor: "#f4f5f5", padding: "10px 30px", borderRadius: "10px" }}>
                                                    <Typography style={{ fontWeight: "bold", fontSize: "16px", marginBottom:"5px" }}>{comment.commenter.username}</Typography>
                                                    <Typography style={{ fontSize: "16px", width: "320px" }}>
                                                        {comment.contentComment}
                                                    </Typography>
                                                </CardContent>
                                                <Button
                                                    style={{ color: "red" }}
                                                    size='small'
                                                    onClick={(e) => dispatch(deleteComment(post._id, comment._id))}> <DeleteForeverIcon />
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
