'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, ChevronRight } from 'lucide-react'
import { FarmData } from '../lib/types'

interface FarmsListProps {
  farms: FarmData[]
  selectedFarm: string | null
  onSelectFarm: (farmId: string) => void
  onDeleteFarm: (farmId: string) => void
}

export default function FarmsList({
  farms,
  selectedFarm,
  onSelectFarm,
  onDeleteFarm,
}: FarmsListProps) {
  if (farms.length === 0) {
    return (
      <Card className="border-emerald-200">
        <CardContent className="pt-12 pb-12 text-center">
          <p className="text-gray-500 mb-2">No farms added yet</p>
          <p className="text-gray-400 text-sm">Create your first farm to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {farms.map((farm) => (
        <Card
          key={farm.id}
          className={`cursor-pointer border-2 transition-all hover:shadow-md ${
            selectedFarm === farm.id
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-emerald-200 hover:border-emerald-300'
          }`}
          onClick={() => onSelectFarm(farm.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-emerald-700">{farm.farmName}</CardTitle>
                <CardDescription>Location: {farm.location}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteFarm(farm.id)
                }}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sheds:</span>
              <span className="font-semibold text-black">{farm.totalSheds}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Records:</span>
              <span className="font-semibold text-black">{farm.records?.length || 0}</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Created: {new Date(farm.createdDate).toLocaleDateString()}
              </span>
              <ChevronRight className="w-4 h-4 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}