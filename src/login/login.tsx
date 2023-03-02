import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../account-management-api-sdk/account-management-api"
import { redirectToHome, redirectToNewsfeed } from "../services/auth-service"

export default function Login() {
    const [usernameField, setUsernameField] = useState<string>('')
    const [passwordField, setPasswordField] = useState<string>('')

    const navigate = useNavigate();

    return (
        <div className="grid grid-column place-content-center"> 
          <h1 className="text-center">Login</h1>
          <h4 className="text-center">Your username and password go in the fields below</h4>

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

          <button className="btn btn-primary mt-4" onClick={() => login(usernameField, passwordField).then(() => redirectToNewsfeed())} >
              Login
          </button>
          <button className="btn btn-link mt-4" onClick={() => navigate('/')}>No Account?</button>
          <h4 className="text-center">...go make one</h4>
        </div>
    )
}