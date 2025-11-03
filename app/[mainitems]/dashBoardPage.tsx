'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LogOut, Plus } from 'lucide-react'
import FarmsList from './farmList'
import AddFarmForm from './addFarm'
import FarmDetails from './farmDetail'
import { FarmData } from '../lib/types'

interface DashboardPageProps {
  onLogout: () => void
}

export default function DashboardPage({ onLogout }: DashboardPageProps) {
  const [farms, setFarms] = useState<FarmData[]>([])
  const [selectedFarm, setSelectedFarm] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Load farms from localStorage
  useEffect(() => {
    const savedFarms = localStorage.getItem('poultryFarms')
    if (savedFarms) {
      setFarms(JSON.parse(savedFarms))
    }
  }, [])

  // Save farms to localStorage
  useEffect(() => {
    localStorage.setItem('poultryFarms', JSON.stringify(farms))
  }, [farms])

  const handleLogout = () => {
    localStorage.removeItem('poultryFarmLoggedIn')
    localStorage.removeItem('adminEmail')
    onLogout()
  }

  const handleAddFarm = (newFarm: FarmData) => {
    const farm = {
      ...newFarm,
      id: Date.now().toString(),
    }
    setFarms([...farms, farm])
    setShowAddForm(false)
  }

  const handleDeleteFarm = (farmId: string) => {
    setFarms(farms.filter(f => f.id !== farmId))
    if (selectedFarm === farmId) {
      setSelectedFarm(null)
    }
  }

  const handleUpdateFarmRecords = (farmId: string, records: any[]) => {
    setFarms(farms.map(farm => 
      farm.id === farmId ? { ...farm, records } : farm
    ))
  }

  const selectedFarmData = farms.find(f => f.id === selectedFarm)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-emerald-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700">🐔 Poultry Farm Management</h1>
            <p className="text-gray-600 text-sm">Track egg production and farm performance</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white border border-emerald-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-100">
              All Farms
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-emerald-100" disabled={!selectedFarm}>
              Farm Details
            </TabsTrigger>
            <TabsTrigger value="add" className="data-[state=active]:bg-emerald-100">
              Add New Farm
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-black">My Farms</h2>
                <p className="text-gray-600">Total farms: {farms.length}</p>
              </div>
            </div>
            <FarmsList
              farms={farms}
              selectedFarm={selectedFarm}
              onSelectFarm={(farmId) => {
                setSelectedFarm(farmId)
                setActiveTab('details')
              }}
              onDeleteFarm={handleDeleteFarm}
            />
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4">
            {selectedFarmData ? (
              <FarmDetails
                farm={selectedFarmData}
                onUpdateRecords={(records) => handleUpdateFarmRecords(selectedFarmData.id, records)}
              />
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-gray-500">
                  Select a farm from the overview to view details
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Add Farm Tab */}
          <TabsContent value="add">
            <AddFarmForm onAddFarm={handleAddFarm} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}