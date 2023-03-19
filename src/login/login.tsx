import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../account-management-api-sdk/account-management-api"
import { redirectToHome, redirectToNewsfeed } from "../services/auth-service"

export default function Login() {
    const [usernameField, setUsernameField] = useState<string>('')
    const [passwordField, setPasswordField] = useState<string>('')

    const navigate = useNavigate();

    return (
        <div className="grid grid-column place-content-center h-screen">
            <div className="relative border-4 border-primary z-10 w-[48rem]">
                <div className="absolute inset-0 border-[248px] border-white transform -rotate-45 z-20">
                </div>
                <div className="absolute inset-0 border-[248px] border-white transform rotate-45 z-20">
                </div>
                <div className="p-24 my-8 z-50 text-center relative">
                    <h1 className="text-center mb-4">Login</h1>
                    <form>
                        <input
                          className="input input-bordered w-full appearance-none my-2"
                          type="text"
                          placeholder='Username'
                          onBlur={(event) => setUsernameField(event.target.value)} />
                        <input
                          className="input input-bordered w-full appearance-none my-2"
                          type="password"
                          placeholder='Password'
                          onBlur={(event) => setPasswordField(event.target.value)} />
                        <button className="btn btn-primary mt-4 w-full" onClick={() => login(usernameField, passwordField).then(() => redirectToNewsfeed())} >
                            Login
                        </button>
                    </form>
                    <button className="btn btn-link mt-4" onClick={() => navigate('/')}>No Account?</button>
                </div>
            </div>
        </div>
    )
}