import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { voteOnPost } from "../account-management-api-sdk/account-management-api"
import { Post } from "../dtos/post"
import { VoteResponse } from "../dtos/vote-response"

export default function PostComponent(props: { post: Post }) {
    const [post, setPost] = useState<Post>(props.post)

    const handleVote = (voteType: number) => {
        if (voteType != 0 && voteType != 1) {
            return
        }

        const updatePostVote = async () => {
            const updatedPostVotes: VoteResponse = await voteOnPost(post.id, voteType)
            setPost({
                id: post.id,
                username: post.username,
                body: post.body,
                upvoteCount: updatedPostVotes.upvoteCount,
                downvoteCount: updatedPostVotes.downvoteCount
            })
        }

        updatePostVote()
    }

    return (
    <div className="card w-96 bg-primary text-primary-content my-4">
        <div className="card-body">
            <h2 className="card-title">@{ post.username }</h2>
            <p>{ post.body }</p>
            <div className="card-actions justify-end">
                <div>
                    <button className="inline-flex" onClick={() => handleVote(1)}>
                        <FontAwesomeIcon icon={faHeart} className="mt-1"/>
                        <p className="ml-2"> { post.upvoteCount }</p>
                    </button>
                </div>
                <div className="ml-4">
                    <button className="inline-flex" onClick={() => handleVote(0)}>
                        <FontAwesomeIcon icon={faTrash} className="mt-1"/>
                        <p className="ml-2"> { post.downvoteCount }</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}