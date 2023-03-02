import { useEffect, useState } from "react"
import { createPost, getPosts } from "../account-management-api-sdk/account-management-api"
import { Post } from "../dtos/post"
import User from "../dtos/user";
import { getCurrentUser } from "../services/auth-service";

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
            .then(() => loadPosts())  
    }

    return (
        <div>
            <h1>Newsfeed</h1>
            <div>
            {
                posts.map(post => (
                    <div>
                        { post.username }
                        { post.body }
                        { post.upvoteCount }
                        { post.downvoteCount }
                    </div>
                ))
            }
            </div>
            <div>
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
        </div>);
}