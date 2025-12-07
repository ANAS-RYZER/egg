'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FarmData, ProductionRecord } from '../lib/types'
import AddRecordForm from './addRecordFarm'
import RecordsTable from './recordTable'
import useAddRecord from '../hooks/farms/useAddRecord'

interface FarmDetailsProps {
  farm: FarmData
  onUpdateRecords: (records: ProductionRecord[]) => void
}

export default function FarmDetails({ farm, onUpdateRecords }: FarmDetailsProps) {
  const [showAddRecord, setShowAddRecord] = useState(false)

  const { addRecord, loading, error } = useAddRecord()

  const handleAddRecord = async (record: ProductionRecord) => {
    try {
      await addRecord(farm._id, record)
      setShowAddRecord(false)
      // Trigger refresh in parent
      onUpdateRecords([...(farm.records || []), record])
    } catch (err) {
      console.error("Failed to add record", err)
    }
  }

  const handleDeleteRecord = (index: number) => {
    const updatedRecords = farm.records?.filter((_, i) => i !== index) || []
    onUpdateRecords(updatedRecords)
  }

  return (
    <div className="space-y-6">
      {/* Farm Info Card */}
      <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-gray-900">{farm.farmName}</CardTitle>
              <CardDescription>Farm Information</CardDescription>
            </div>
            <div className="bg-emerald-100 px-3 py-1 rounded-full">
              <span className="text-emerald-700 text-sm font-medium capitalize">{farm.type} Farm</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold text-black">{farm.location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Capacity</p>
            <p className="font-semibold text-black">{farm.capacity?.toLocaleString()} Birds</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Sheds</p>
            <p className="font-semibold text-black">{farm.totalSheds}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Owner</p>
            <p className="font-semibold text-black">{farm.ownerName || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Created</p>
            <p className="font-semibold text-black">{new Date(farm.createdDate).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Production Records */}
      <Card className="border-emerald-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-emerald-700">Production Records</CardTitle>
              <CardDescription>Shed-wise daily production data</CardDescription>
            </div>
            <Button
              onClick={() => setShowAddRecord(!showAddRecord)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {showAddRecord ? 'Cancel' : '+ Add Record'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddRecord && (
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <AddRecordForm
                farmId={farm._id}
                totalSheds={farm.totalSheds}
                onAddRecord={handleAddRecord}
              />
            </div>
          )}

          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white border border-emerald-200">
              <TabsTrigger value="table" className="data-[state=active]:bg-emerald-100">
                Table View
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-100">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="table">
              <RecordsTable
                records={farm.records || []}
                onDeleteRecord={handleDeleteRecord}
              />
            </TabsContent>

            <TabsContent value="analytics">
              <Analytics records={farm.records || []} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function Analytics({ records }: { records: ProductionRecord[] }) {
  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No records to analyze yet
      </div>
    )
  }

  const totalRecords = records.length
  const avgMortality = (
    records.reduce((sum, r) => sum + (r.mortality || 0), 0) / totalRecords
  ).toFixed(2)

  const avgFoodConsumed = (
    records.reduce((sum, r) => sum + (r.gramsOfFoodPerHen || 0), 0) / totalRecords
  ).toFixed(2)

  const totalEggs = records.reduce((sum, r) => sum + (r.closingStock || 0), 0)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600">Total Records</p>
          <p className="text-2xl font-bold text-blue-700">{totalRecords}</p>
        </CardContent>
      </Card>
      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600">Avg Mortality %</p>
          <p className="text-2xl font-bold text-red-700">{avgMortality}%</p>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600">Avg Food/Hen (g)</p>
          <p className="text-2xl font-bold text-green-700">{avgFoodConsumed}g</p>
        </CardContent>
      </Card>
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-4">
          <p className="text-sm text-gray-600">Total Eggs (Avg)</p>
          <p className="text-2xl font-bold text-yellow-700">{(totalEggs / totalRecords).toFixed(0)}</p>
        </CardContent>
      </Card>
    </div>
  )
}