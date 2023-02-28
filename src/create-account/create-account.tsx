import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "../services/environment"

export default function CreateAccount() {
    const [usernameField, setUsernameField] = useState<string>('')
    const [passwordField, setPasswordField] = useState<string>('')

    const navigate = useNavigate();

    return (
        <div className="grid grid-column place-content-center">
            <h1 className="text-center">Create Account</h1>
            <h4 className="text-center">or don't, it's totally up to you</h4>
            <input 
                className="input input-bordered w-full appearance-none my-2"
                placeholder="Username"/>
            <input
                className="input input-bordered w-full appearance-none my-2"
                placeholder="Password"/>
            <input
                className="input input-bordered w-full appearance-none my-2"
                placeholder="Confirm Password"/>
            <button className="btn btn-primary mt-4" onClick={() => createAccount(usernameField, passwordField)}>Create Account</button>
            <button className="btn btn-link mt-4" onClick={() => navigate('/login')}>Already have account?</button>
            <h4 className="text-center">...then go login</h4>
        </div>)
}

function createAccount(username: string, password: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password})
    }
  
    fetch(`${baseUrl}/api/users`, requestOptions)
      .then(response => response.json())
}