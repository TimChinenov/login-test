import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAccount } from "../account-management-api-sdk/account-management-api"
import { redirectToNewsfeed } from "../services/auth-service"

interface CreateAccountForm {
    username: string | null,
    password: string | null,
    confirmPassword: string | null
}

export default function CreateAccount() {
    const [createAccountFormData, setCreateAccountFormData] = useState<CreateAccountForm>({
        username: null,
        password: null,
        confirmPassword: null
    })

    const navigate = useNavigate();

    const handleChange = (key: any) => (e: any) => {
        setCreateAccountFormData({
            ...createAccountFormData,
            [key]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (!createAccountFormData.username || !createAccountFormData.password || !createAccountFormData.confirmPassword) {
            return
        }

        createAccount(
            createAccountFormData.username,
            createAccountFormData.password,
            createAccountFormData.confirmPassword)
        .then(() => redirectToNewsfeed())
    }

    return (
        <div className="grid grid-column place-content-center h-screen">
            <div className="relative border-4 border-primary z-10 w-[48rem]">
                <div className="absolute inset-0 border-[124px] border-white transform -rotate-45 z-20">
                </div>
                <div className="absolute inset-0 border-[124px] border-white transform rotate-45 z-20">
                </div>
                <div className="p-24 z-50 text-center relative">
                    <h1 className="text-center mb-4">Join The Club</h1>
                    <form>
                        <input
                            className="input input-bordered w-full appearance-none my-2"
                            value={createAccountFormData.username || ""}
                            onChange={handleChange("username")}
                            placeholder="Username"/>
                        <input
                            className="input input-bordered w-full appearance-none my-2"
                            value={createAccountFormData.password || ""}
                            onChange={handleChange("password")}
                            type="password"
                            placeholder="Password"/>
                        <input
                            className="input input-bordered w-full appearance-none my-2"
                            value={createAccountFormData.confirmPassword || ""}
                            onChange={handleChange("confirmPassword")}
                            type="password"
                            placeholder="Confirm Password"/>
                        <button className="btn btn-primary mt-4 w-full" onClick={() => handleSubmit()}>
                            Create Account
                        </button>
                    </form>
                    <button className="btn btn-link mt-4" onClick={() => navigate("/login")}>Already have account?</button>
                </div>
            </div>
        </div>
    )
}