'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginPage from './[mainitems]/loginpage'
import DashboardPage from './[mainitems]/dashBoardPage'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem('poultryFarmLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {isLoggedIn ? (
        <DashboardPage onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  )
}