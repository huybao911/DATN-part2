import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostApprove } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import ApprovePost from "pages/SManager/ApprovePost";
import FeedPost from "pages/Manager/FeedPost";
const Posts: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [posts, setPosts] = React.useState<IPost[]>([]);
    const smanager = useSelector((state: RootState) => state.smanager);

    React.useEffect(() => {
        dispatch(getPostApprove());
    }, [dispatch]);

    React.useEffect(() => {
        setPosts(() =>
            smanager?.posts?.filter((post: any) =>
                post.title || post.content || post.image || post.poster
            ));
    }, [smanager]);

    React.useEffect(() => {
        document.title = "POST";
    }, []);

    return (

        <>
            {posts.map((post: any) =>
                <ApprovePost post={post} key={post._id} />
                )}
        </>
    );
};

export default Posts;
