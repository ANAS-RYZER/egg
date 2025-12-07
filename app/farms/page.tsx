'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FarmList from '../[mainitems]/farmList'
import { FarmData } from '../lib/types'
import { Button } from '@/components/ui/button'
import { Plus, ArrowLeft } from 'lucide-react'

export default function Farms() {
    const router = useRouter()
    const [farms, setFarms] = useState<FarmData[]>([])
    const [selectedFarm, setSelectedFarm] = useState<string | null>(null)

    useEffect(() => {
        // Check if user is logged in
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // Load farms from localStorage
        const savedFarms = localStorage.getItem('poultryFarms')
        if (savedFarms) {
            setFarms(JSON.parse(savedFarms))
        }
    }, [router])

    const handleSelectFarm = (farmId: string) => {
        router.push(`/farm/${farmId}`)
    }

    const handleDeleteFarm = (farmId: string) => {
        const updatedFarms = farms.filter(f => f._id !== farmId)
        setFarms(updatedFarms)
        localStorage.setItem('poultryFarms', JSON.stringify(updatedFarms))
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            {/* Header */}
            <header className="bg-white border-b border-emerald-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                onClick={() => router.push('/dashboard')}
                                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                            <div>
                                <h1 className="text-3xl font-bold text-emerald-700">My Farms</h1>
                                <p className="text-gray-600 text-sm">Total farms: {farms.length}</p>
                            </div>
                        </div>
                        <Button
                            onClick={() => router.push('/farm/add')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Farm
                        </Button>
                    </div>
                </div>
            </header>

            {/* Farm List */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <FarmList
                    farms={farms}
                    selectedFarm={selectedFarm}
                    onSelectFarm={handleSelectFarm}
                    onDeleteFarm={handleDeleteFarm}
                />
            </div>
        </main>
    )
}
