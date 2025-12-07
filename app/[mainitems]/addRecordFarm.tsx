'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ProductionRecord } from '../lib/types'

interface AddRecordFormProps {
  farmId: string
  totalSheds: number
  onAddRecord: (record: ProductionRecord) => void
}

export default function AddRecordForm({
  farmId,
  totalSheds,
  onAddRecord,
}: AddRecordFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    shedNo: '',
    age: '',
    mortality: '',
    openingStock: '',
    closingStock: '',
    foodQty: '',
    gramsOfFoodPerHen: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleShedChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      shedNo: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.shedNo || !formData.age || !formData.openingStock) {
      alert('Please fill required fields')
      return
    }

    const record: ProductionRecord = {
      id: Date.now().toString(),
      farmId,
      date: formData.date,
      shedNo: parseInt(formData.shedNo),
      age: parseInt(formData.age),
      mortality: parseInt(formData.mortality) || 0,
      openingStock: parseInt(formData.openingStock),
      closingStock: parseInt(formData.closingStock) || 0,
      foodQty: parseFloat(formData.foodQty) || 0,
      gramsOfFoodPerHen: parseFloat(formData.gramsOfFoodPerHen) || 0,
      createdAt: new Date().toISOString(),
    }

    onAddRecord(record)

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      shedNo: '',
      age: '',
      mortality: '',
      openingStock: '',
      closingStock: '',
      foodQty: '',
      gramsOfFoodPerHen: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Date */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-black">Date *</label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="h-9 text-sm"
          />
        </div>

        {/* Shed No */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-black">Shed No *</label>
          <Select value={formData.shedNo} onValueChange={handleShedChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select Shed" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalSheds }, (_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>
                  Shed {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Age */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-black">Age (days) *</label>
          <Input
            type="number"
            name="age"
            placeholder="90"
            value={formData.age}
            onChange={handleChange}
            className="h-9 text-sm"
          />
        </div>

        {/* Opening Stock */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-black">Opening Stock *</label>
          <Input
            type="number"
            name="openingStock"
            placeholder="1000"
            value={formData.openingStock}
            onChange={handleChange}
            className="h-9 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Mortality */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-black">Mortality</label>
          <Input
            type="number"
            name="mortality"
            placeholder="5"
            value={formData.mortality}
            onChange={handleChange}
            className="h-9 text-sm"
          />
        </div>

        {/* Closing Stock */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-black">Closing Stock</label>
          <Input
            type="number"
            name="closingStock"
            placeholder="995"
            value={formData.closingStock}
            onChange={handleChange}
            className="h-9 text-sm"
          />
        </div>

        {/* Food Qty */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-black">Food Qty (kg)</label>
          <Input
            type="number"
            step="0.1"
            name="foodQty"
            placeholder="50"
            value={formData.foodQty}
            onChange={handleChange}
            className="h-9 text-sm"
          />
        </div>

        {/* Grams of Food Per Hen */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-black">Food/Hen (g)</label>
          <Input
            type="number"
            step="0.1"
            name="gramsOfFoodPerHen"
            placeholder="50"
            value={formData.gramsOfFoodPerHen}
            onChange={handleChange}
            className="h-9 text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Add Record
        </Button>
      </div>
    </form>
  )
}