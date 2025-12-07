'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AddFarm from '../../[mainitems]/addFarm'
import { FarmData } from '@/app/lib/types'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function AddFarmPage() {
    const router = useRouter()

    const handleAddFarm = (newFarm: FarmData) => {
        // Load existing farms
        const savedFarms = localStorage.getItem('poultryFarms')
        const farms: FarmData[] = savedFarms ? JSON.parse(savedFarms) : []

        // Create farm with unique ID
        const farm = {
            ...newFarm,
            id: Date.now().toString(),
        }

        // Save to localStorage
        const updatedFarms = [...farms, farm]
        localStorage.setItem('poultryFarms', JSON.stringify(updatedFarms))

        // Navigate back to farms list
        router.push('/farms')
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            {/* Header */}
            <header className="bg-white border-b border-emerald-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => router.push('/farms')}
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Farms
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-emerald-700">Add New Farm</h1>
                            <p className="text-gray-600 text-sm">Register a new poultry farm</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Form */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                <AddFarm onAddFarm={handleAddFarm} />
            </div>
        </main>
    )
}
