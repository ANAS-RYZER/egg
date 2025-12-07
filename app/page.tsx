'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check authentication and redirect
    const loggedIn = localStorage.getItem('poultryFarmLoggedIn') === 'true'
    if (loggedIn) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  // Loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}