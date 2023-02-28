import { useEffect, useState } from "react"
import User from "../dtos/user"
import { getCurrentUser } from "../services/auth-service"

export default function Home(props: any) {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        getCurrentUser()
            .then((user: User) => setUser( user))
    }, [])

    return (
        <div className="grid grid-column place-content-center">
            <h1>What's Going {user?.username}?</h1>
            <p>Score: {user?.score}</p>
        </div>
    )
}