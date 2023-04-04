import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import { Button, Container, Typography, Stack } from "@mui/material";
import { Link } from 'react-router-dom';
import FeedPost from "pages/Manager/FeedPost";
const Posts: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [posts, setPosts] = React.useState<IPost[]>([]);
    const manager = useSelector((state: RootState) => state.manager);

    React.useEffect(() => {
        dispatch(getPost());
    }, [dispatch]);
    
    React.useEffect(() => {
        setPosts(() =>
            manager?.posts?.filter((post: any) =>
                post.title || post.content || post.image
            ));
    }, [manager]);

    React.useEffect(() => {
        document.title = "POST";
    }, []);

    return (

        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Post
                    </Typography>
                    <Link to="/posts/newpost">
                        <Button style={{ backgroundColor: "black", padding: "6px 16px", color: "white" }} variant="contained" >
                            New Post
                        </Button>
                    </Link>
                </Stack>
            </Container>
            {posts.map((post: any) =>
                <FeedPost post={post} key={post._id} />) ?? (
                    <p>No Department Found.</p>
                )}
        </>
    );
};

export default Posts;
