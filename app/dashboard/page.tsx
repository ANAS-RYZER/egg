'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardPage from '../[mainitems]/dashBoardPage'

export default function Dashboard() {
    const router = useRouter()



    const handleLogout = () => {
        sessionStorage.removeItem('token');
        router.push('/login')
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return (
        <main className="min-h-screen">
            <DashboardPage onLogout={handleLogout} />
        </main>
    )
}
