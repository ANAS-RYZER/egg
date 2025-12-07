'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

interface LoginPageProps {
  onLoginSuccess: (email: string, password: string) => Promise<void>
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await onLoginSuccess(email, password)
      router.push('/dashboard')
    } catch (err) {
      console.error("Login error in component:", err)
      setError("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-700 mb-2">🐔 Poultry Farm</h1>
          <p className="text-gray-600">Egg Production Management System</p>
        </div>

        <Card className="border-emerald-200 shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-emerald-700">Admin Login</CardTitle>
            <CardDescription>Manage your farms and track egg production</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-black">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@farm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-emerald-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-emerald-200"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-xs text-emerald-700 font-medium mb-1">Demo Credentials:</p>
              <p className="text-xs text-emerald-600">Email: admin@farm.com</p>
              <p className="text-xs text-emerald-600">Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}