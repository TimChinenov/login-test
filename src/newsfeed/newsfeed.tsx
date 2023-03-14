import { useEffect, useState } from "react"
import { createPost, getPosts } from "../account-management-api-sdk/account-management-api"
import { Post } from "../dtos/post"
import User from "../dtos/user";
import { getCurrentUser } from "../services/auth-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import PostComponent from "./post-component";

export default function Newsfeed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [bodyData, setBodyData] = useState<string>("");
    const [user, setUser] = useState<User>()

    const loadPosts = async () => {
        const postData = await getPosts(1, 15)
        setPosts(postData)
    }

    useEffect(() => {
        loadPosts();
    }, []);

    useEffect(() => {
        const loadUser = async () => {
            const userData = await getCurrentUser()
            setUser(userData)
        }
        loadUser();
    }, [])

    const handleChange = (e: any) => {
        setBodyData(e.target.value)
    }

    const handleSubmit = () => {
        if (!user) {
            return
        }

        createPost(user?.id, bodyData)
            .then(() => {
                setBodyData("")
                loadPosts()
            })  
    }

    return (
        <div className="grid grid-column place-content-center">
            <h1>Newsfeed</h1>
            <div className="grid grid-row my-2">
                <textarea
                    className="textarea textarea-bordered"
                    value={bodyData || ""}
                    onChange={(event) => handleChange(event)}
                    placeholder="Bio">
                </textarea>
                <button
                    className="btn btn-secondary mt-4"
                    onClick={() => handleSubmit()}>post</button>
            </div>
            <div>
            {
                posts.length && posts.map(post => (
                    <div>
                        <PostComponent key={post.id} post={post} />
                    </div>
                ))
            }
            </div>
        </div>);
}