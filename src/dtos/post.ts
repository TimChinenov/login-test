export interface Post {
    id: number,
    username: string,
    body: string,
    upvoteCount: number,
    downvoteCount: number,
    currentUserVoteType: number
}