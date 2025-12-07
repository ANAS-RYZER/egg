'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, ArrowRight, MapPin, Activity } from 'lucide-react'
import AddFarmForm from './addFarm'
import { FarmData } from '../lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface DashboardPageProps {
  onLogout: () => void
}

import useAddFarm from '../hooks/farms/useAddFarm'
import useFarms from '../hooks/farms/useFarms'


export default function DashboardPage({ onLogout }: DashboardPageProps) {
  const router = useRouter()
  const [showAddDialog, setShowAddDialog] = useState(false)

  const { farms, loading: isLoadingFarms, refetch: refetchFarms } = useFarms()
  const { addFarm, loading: isAdding, error: addError } = useAddFarm()

  const handleAddFarm = async (newFarm: FarmData) => {
    try {
      await addFarm(newFarm)
      await refetchFarms() // Refresh the list after adding
      setShowAddDialog(false)
    } catch (error) {
      console.error("Failed to add farm:", error)
    }
  }

  const handleViewFarm = (farmId: string) => {
    router.push(`/farm/${farmId}`)
  }


  console.log(farms , "farms")


  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-600 text-white pb-20 pt-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white">Dashboard</h2>
              <p className="text-emerald-100 mt-2 text-lg">Manage your poultry operations efficiently</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onLogout}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                Logout
              </Button>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-black text-emerald-700 hover:bg-emerald-50 shadow-lg border-0 font-semibold">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Farm
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Farm</DialogTitle>
                  </DialogHeader>
                  <AddFarmForm onAddFarm={handleAddFarm} isLoading={isAdding} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        {isLoadingFarms ? (
          <div className="flex items-center justify-center py-20 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : farms?.length === 0 ? (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="flex flex-col h-[400px] items-center justify-center py-20 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No farms added yet</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                Get started by adding your first poultry farm to track production, manage sheds, and monitor performance.
              </p>
              <Button
                onClick={() => setShowAddDialog(true)}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 text-lg shadow-emerald-200 shadow-lg"
              >
                Add Your First Farm
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms?.map((farm) => (
              <Card
                key={farm._id}
                className="group hover:shadow-xl transition-all duration-300 border-emerald-100 cursor-pointer overflow-hidden"
                onClick={() => router.push(`/farm/${farm._id}`)}
              >
                <div className="h-2 bg-emerald-500 w-full" />
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900 mb-1">{farm.farmName}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {farm.location}
                      </CardDescription>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-lg group-hover:bg-emerald-100 transition-colors">
                      <ArrowRight className="w-4 h-4 text-emerald-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Total Sheds</p>
                      <p className="text-lg font-bold text-gray-900">{farm?.totalSheds?.toLocaleString() || 0}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase font-semibold">Owner NAME</p>
                      <p className="text-lg font-bold text-gray-900 capitalize">{farm.ownerName}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Activity className="w-4 h-4 text-emerald-500" />
                      Active
                    </span>
                    <span>
                      View Details
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}