import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../account-management-api-sdk/account-management-api"
import { redirectToNewsfeed } from "../services/auth-service"

interface LoginForm {
  username: string | null,
  password: string | null
}

export default function Login() {
    const [loginFormData, setLoginFormData] = useState<LoginForm>({
      username: null,
      password: null
    })

    const navigate = useNavigate();

    const handleChange = (key: any) => (e: any) => {
      setLoginFormData({
          ...loginFormData,
          [key]: e.target.value
      })
    }

    const handleSubmit = () => {
        if (!loginFormData.username || !loginFormData.password) {
            return
        }

        login(loginFormData.username, loginFormData.password)
          .then(() => redirectToNewsfeed())
    }

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
                          value={loginFormData.username || ""}
                          onChange={handleChange("username")}
                          type="text"
                          placeholder="Username"/>
                        <input
                          className="input input-bordered w-full appearance-none my-2"
                          value={loginFormData.password || ""}
                          onChange={handleChange("passowrd")}
                          type="password"
                          placeholder="Password"/>
                        <button className="btn btn-primary mt-4 w-full" onClick={() => handleSubmit()}>
                            Login
                        </button>
                    </form>
                    <button className="btn btn-link mt-4" onClick={() => navigate("/")}>No Account?</button>
                </div>
            </div>
        </div>
    )
}