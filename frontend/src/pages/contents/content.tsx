import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import FeedContent from "pages/contents/FeedContent";
const Content: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [posts, setPosts] = React.useState<IPost[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    React.useEffect(() => {
        setPosts(() =>
            user?.posts?.filter((post: any) =>
                post.title || post.content || post.image
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "TRANG CHỦ";
    }, []);

    return (
        <>
            {posts.map((post: any) =>
                <FeedContent post={post} key={post._id} />) ?? (
                    <p>No FeedContent Found.</p>
                )}
        </>
    );
};

export default Content;
