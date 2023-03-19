import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAccount } from "../account-management-api-sdk/account-management-api"
import { redirectToHome, redirectToNewsfeed } from "../services/auth-service"
import { baseUrl } from "../services/environment"

interface createAccountForm {
    username: string,
    password: string,
    confirmPassword: string
}

export default function CreateAccount() {
    const [createAccountFormData, setCreateAccountFormData] = useState<any>({})

    const navigate = useNavigate();

    const handleChange = (key: any) => (e: any) => {
        setCreateAccountFormData({
            ...createAccountFormData,
            [key]: e.target.value
        })
    }

    const handleSubmit = () => {
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
                            value={createAccountFormData.username || ''}
                            onChange={handleChange('username')}
                            className="input input-bordered w-full appearance-none my-2"
                            placeholder="Username"/>
                        <input
                            value={createAccountFormData.password || ''}
                            onChange={handleChange('password')}
                            type="password"
                            className="input input-bordered w-full appearance-none my-2"
                            placeholder="Password"/>
                        <input
                            value={createAccountFormData.confirmPassword || ''}
                            onChange={handleChange('confirmPassword')}
                            type="password"
                            className="input input-bordered w-full appearance-none my-2"
                            placeholder="Confirm Password"/>
                        <button className="btn btn-primary mt-4 w-full" onClick={() => handleSubmit()}>
                            Create Account
                        </button>
                    </form>
                    <button className="btn btn-link mt-4" onClick={() => navigate('/login')}>Already have account?</button>
                </div>
            </div>
        </div>
    )
}