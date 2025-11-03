'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FarmData } from '../lib/types'

interface AddFarmFormProps {
  onAddFarm: (farm: FarmData) => void
}

export default function AddFarmForm({ onAddFarm }: AddFarmFormProps) {
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    totalSheds: '',
    ownerName: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.farmName || !formData.location || !formData.totalSheds) {
      alert('Please fill all fields')
      return
    }

    const newFarm: FarmData = {
      id: '',
      farmName: formData.farmName,
      location: formData.location,
      totalSheds: parseInt(formData.totalSheds),
      ownerName: formData.ownerName,
      createdDate: new Date().toISOString(),
      records: [],
    }

    onAddFarm(newFarm)
    setFormData({
      farmName: '',
      location: '',
      totalSheds: '',
      ownerName: '',
    })
  }

  return (
    <Card className="border-emerald-200 max-w-2xl">
      <CardHeader>
        <CardTitle className="text-emerald-700">Add New Farm</CardTitle>
        <CardDescription>Register a new poultry farm to start tracking production</CardDescription>
      </CardHeader>
      <CardContent>
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
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Add Farm
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}