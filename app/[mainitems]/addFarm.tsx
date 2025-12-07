'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FarmData } from '../lib/types'

interface AddFarmFormProps {
  onAddFarm: (farm: FarmData) => void
  isLoading?: boolean
}

export default function AddFarmForm({ onAddFarm, isLoading = false }: AddFarmFormProps) {
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    totalSheds: '',
    capacity: '',
    type: 'layer' as 'layer' | 'broiler' | 'breeder',
    ownerName: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value as 'layer' | 'broiler' | 'breeder',
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.farmName || !formData.location || !formData.totalSheds || !formData.capacity) {
      alert('Please fill all required fields')
      return
    }

    const newFarm: FarmData = {
      id: '',
      farmName: formData.farmName,
      location: formData.location,
      totalSheds: parseInt(formData.totalSheds),
      capacity: parseInt(formData.capacity),
      type: formData.type,
      ownerName: formData.ownerName,
      createdDate: new Date().toISOString(),
      records: [],
    }

    onAddFarm(newFarm)
    setFormData({
      farmName: '',
      location: '',
      totalSheds: '',
      capacity: '',
      type: 'layer',
      ownerName: '',
    })
  }

  return (
    <Card className="border-emerald-200 w-full shadow-none border-0">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Farm Name *</label>
              <Input
                name="farmName"
                placeholder="e.g., Green Valley Farm"
                value={formData.farmName}
                onChange={handleChange}
                className="border-emerald-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Location *</label>
              <Input
                name="location"
                placeholder="e.g., Punjab"
                value={formData.location}
                onChange={handleChange}
                className="border-emerald-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Total Sheds *</label>
              <Input
                name="totalSheds"
                type="number"
                placeholder="e.g., 5"
                value={formData.totalSheds}
                onChange={handleChange}
                className="border-emerald-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Capacity (Birds) *</label>
              <Input
                name="capacity"
                type="number"
                placeholder="e.g., 10000"
                value={formData.capacity}
                onChange={handleChange}
                className="border-emerald-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Farm Type *</label>
              <Select value={formData.type} onValueChange={handleTypeChange}>
                <SelectTrigger className="border-emerald-200">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="layer">Layer (Egg Production)</SelectItem>
                  <SelectItem value="broiler">Broiler (Meat Production)</SelectItem>
                  <SelectItem value="breeder">Breeder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-black">Owner Name</label>
              <Input
                name="ownerName"
                placeholder="e.g., Farmer John"
                value={formData.ownerName}
                onChange={handleChange}
                className="border-emerald-200"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4"
          >
            {isLoading ? 'Adding Farm...' : 'Add Farm'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}