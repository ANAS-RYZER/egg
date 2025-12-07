'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import FarmDetail from '../../[mainitems]/farmDetail'
import { FarmData, ProductionRecord } from '@/app/lib/types'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

import useFetchSingleFarm from '@/app/hooks/farms/useFetchSingleFarm'
import useGetRecord from '@/app/hooks/farms/useGetRecord'

export default function FarmDetailPage() {
    const router = useRouter()
    const params = useParams()
    const farmId = params.id as string

    const { farm, loading: farmLoading, error: farmError, fetchSingleFarm } = useFetchSingleFarm()
    const { records, loading: recordsLoading, error: recordsError, fetchRecords } = useGetRecord()

    useEffect(() => {
        // Check if user is logged in
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        if (farmId) {
            fetchSingleFarm(farmId)
            fetchRecords(farmId)
        }
    }, [router, farmId, fetchSingleFarm, fetchRecords])

    const handleUpdateRecords = (updatedRecords: ProductionRecord[]) => {
        // When records are updated (added/deleted), refresh the list
        fetchRecords(farmId)
    }


    if (farmLoading || recordsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading farm details...</p>
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
                            onClick={() => router.push('/dashboard')}
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{farm.farmName}</h1>
                            <p className="text-emerald-100 text-sm mt-1">Farm Details & Production Records</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Farm Details */}
            <div className="max-w-7xl mx-auto px-4 -mt-12">
                <FarmDetail
                    farm={{ ...farm, records: records }}
                    onUpdateRecords={handleUpdateRecords}
                />
            </div>
        </main>
    )
}
