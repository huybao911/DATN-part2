import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, deletePost } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";

import { Button, Container, Typography, Stack, Card, Popover, Box } from "@mui/material";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Link } from 'react-router-dom';
import UpdatePost from "pages/Manager/UpdatePost";
const Posts: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [posts, setPosts] = React.useState<IPost[]>([]);
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
        dispatch(getPost());
    }, [dispatch]);

    React.useEffect(() => {
        setPosts(() =>
            manager?.posts?.filter((post: any) =>
                post.title || post.content || post.image || post.poster || post.commenter || post.contentComment
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
        document.title = "POST";
    }, []);

    return (

        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Bài Viết
                    </Typography>
                    <Link to="/posts/newpost">
                        <Button style={{ backgroundColor: "black", padding: "6px 16px", color: "white" }} variant="contained" >
                            Tạo Bài Viết
                        </Button>
                    </Link>
                </Stack>
            </Container>
            {posts.map((post: any, index) =>
                <Box key={post._id}>
                    <Box>
                        <Container component={Card} sx={{ paddingBottom: 10, boxShadow: "none" }}>
                            <Card sx={{ maxWidth: 500, height: 493 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            {post?.poster.username.charAt(0).toUpperCase()}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={post?.poster.username}
                                    subheader={formatDate(post?.createdAt.slice(0, 10))}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {post?.title ?? null}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {post?.content ?? null}
                                    </Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={PF + post?.image ?? null}
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
                                    <UpdatePost post={post} key={post._id} />
                                </Box>
                            </Popover>
                            <Button style={{ backgroundColor: "red", color: "white", marginTop: "10px", marginLeft: "10px", height: "43px", width: "100px" }} onClick={(e) => dispatch(deletePost(post._id))} >
                                Xóa
                            </Button>
                        </Container>
                    </Box>
                    <Box>
                        <Typography style={{ fontWeight: "bold" }}>Bình luận của Quản Lý Cấp Cao</Typography>
                    </Box>
                    {post.comments.map((comment: any) =>
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
        </>
    );
};

export default Posts;
