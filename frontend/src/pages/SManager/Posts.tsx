import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { IPost } from "redux/types/post";
import ManagerForm from "pages/Manager/ManagerForm";
const Posts: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [posts, setPosts] = React.useState<IPost[]>([]);
    const smanager = useSelector((state: RootState) => state.smanager);

    React.useEffect(() => {
        dispatch(getPost());
    }, [dispatch]);

    React.useEffect(() => {
        setPosts(() =>
            smanager?.posts?.filter((post: any) =>
                post.title || post.content || post.image
            ));
    }, [smanager]);

    React.useEffect(() => {
        document.title = "GET POST MANAGER DEPARTMENT";
    }, []);

    return (

        <>
            {posts.map((post: any) =>
                <ManagerForm post={post} key={post._id} />) ?? (
                    <p>No Department Found.</p>
                )}
        </>
    );
};

export default Posts;
