'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginPage from '../[mainitems]/loginpage'
import useAuthHook from '../hooks/login/useAuthHook'



export default function Login() {
    const router = useRouter()

    const { login, user, loading, error } = useAuthHook();

    const handleSubmit = async (email: string, password: string) => {
        const loggedInAdmin = await login(email, password);

        if (loggedInAdmin) {
            console.log("Logged in:", loggedInAdmin);
            router.push("/dashboard");
        }
    };

    return (
        <main className="min-h-screen">
            <LoginPage onLoginSuccess={handleSubmit} />
        </main>
    )
}
