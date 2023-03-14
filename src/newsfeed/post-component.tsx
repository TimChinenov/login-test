import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Post } from "../dtos/post"

export default function PostComponent(props: { post: any }) {
    const [post, setPost] = useState(props.post)

    const handleVote = () => {

    }

    return (
    <div className="card w-96 bg-primary text-primary-content my-4">
        <div className="card-body">
            <h2 className="card-title">@{ post.username }</h2>
            <p>{ post.body }</p>
            <div className="card-actions justify-end">
                <div>
                    <button className="inline-flex" onClick={() => handleVote()}>
                        <FontAwesomeIcon icon={faHeart} className="mt-1"/>
                        <p className="ml-2"> { post.upvoteCount }</p>
                    </button>
                </div>
                <div className="ml-4">
                    <button className="inline-flex" onClick={() => handleVote()}>
                        <FontAwesomeIcon icon={faTrash} className="mt-1"/>
                        <p className="ml-2"> { post.downvoteCount }</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}