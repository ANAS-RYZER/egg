'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AddRecordFarm from '../../../[mainitems]/addRecordFarm'
import RecordTable from '../../../[mainitems]/recordTable'
import { FarmData, ProductionRecord } from '@/app/lib/types'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function FarmRecordsPage() {
    const router = useRouter()
    const params = useParams()
    const farmId = params.id as string
    const [farm, setFarm] = useState<FarmData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is logged in
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // Load specific farm from localStorage
        const savedFarms = localStorage.getItem('poultryFarms')
        if (savedFarms) {
            const farms: FarmData[] = JSON.parse(savedFarms)
            const foundFarm = farms.find(f => f._id === farmId)
            if (foundFarm) {
                setFarm(foundFarm)
            } else {
                router.push('/dashboard')
            }
        }
        setLoading(false)
    }, [router, farmId])

    const handleAddRecord = (record: ProductionRecord) => {
        if (!farm) return

        // Add new record to farm
        const updatedRecords = [...(farm.records || []), record]
        const updatedFarm = { ...farm, records: updatedRecords }
        setFarm(updatedFarm)

        // Update in localStorage
        const savedFarms = localStorage.getItem('poultryFarms')
        if (savedFarms) {
            const farms: FarmData[] = JSON.parse(savedFarms)
            const updatedFarms = farms.map(f =>
                f._id === farmId ? updatedFarm : f
            )
            localStorage.setItem('poultryFarms', JSON.stringify(updatedFarms))
        }
    }

    const handleDeleteRecord = (index: number) => {
        if (!farm) return

        // Remove record at index
        const updatedRecords = farm.records?.filter((_, i) => i !== index) || []
        const updatedFarm = { ...farm, records: updatedRecords }
        setFarm(updatedFarm)

        // Update in localStorage
        const savedFarms = localStorage.getItem('poultryFarms')
        if (savedFarms) {
            const farms: FarmData[] = JSON.parse(savedFarms)
            const updatedFarms = farms.map(f =>
                f._id === farmId ? updatedFarm : f
            )
            localStorage.setItem('poultryFarms', JSON.stringify(updatedFarms))
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading records...</p>
                </div>
            </div>
        )
    }

    if (!farm) {
        return null
    }

    return (
        <main className="min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <div className="bg-linear-to-r from-emerald-600 to-teal-600 text-white pb-24 pt-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => router.push(`/farm/${farmId}`)}
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Production Records</h1>
                            <p className="text-emerald-100 text-sm mt-1">{farm.farmName} - Records Management</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Records Content */}
            <div className="max-w-7xl mx-auto px-4 -mt-12">
                <div className="bg-white rounded-lg shadow-sm border border-emerald-200 p-6">
                    <h2 className="text-2xl font-bold text-emerald-700 mb-6">Add Production Record</h2>
                    <AddRecordFarm
                        farmId={farm._id}
                        totalSheds={farm.totalSheds}
                        onAddRecord={handleAddRecord}
                    />
                </div>

                <div className="mt-8 bg-white rounded-lg shadow-sm border border-emerald-200 p-6">
                    <h2 className="text-2xl font-bold text-emerald-700 mb-6">All Records</h2>
                    <RecordTable
                        records={farm.records || []}
                        onDeleteRecord={handleDeleteRecord}
                    />
                </div>
            </div>
        </main>
    )
}
