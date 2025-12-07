'use client'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { ProductionRecord } from '../lib/types'
import { Trash2 } from 'lucide-react'

interface RecordsTableProps {
  records: ProductionRecord[]
  onDeleteRecord: (index: number) => void
}

export default function RecordsTable({ records, onDeleteRecord }: RecordsTableProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No records yet. Add your first production record.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto mt-4 border border-emerald-200 rounded-lg">
      <Table>
        <TableHeader className="bg-emerald-50">
          <TableRow className="border-emerald-200">
            <TableHead className="text-emerald-700">Date</TableHead>
            <TableHead className="text-emerald-700">Shed</TableHead>
            <TableHead className="text-emerald-700">Age (days)</TableHead>
            <TableHead className="text-emerald-700">Opening Stock</TableHead>
            <TableHead className="text-emerald-700">Mortality</TableHead>
            <TableHead className="text-emerald-700">Closing Stock</TableHead>
            <TableHead className="text-emerald-700">Food Qty (kg)</TableHead>
            <TableHead className="text-emerald-700">Food/Hen (g)</TableHead>
            <TableHead className="text-emerald-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={record.id} className="hover:bg-emerald-50 border-emerald-100">
              <TableCell className="font-medium">
                {new Date(record.date).toLocaleDateString()}
              </TableCell>
              <TableCell>Shed {record.shedNo}</TableCell>
              <TableCell>{record.age}</TableCell>
              <TableCell>{record.openingStock}</TableCell>
              <TableCell>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                  {record.mortality}
                </span>
              </TableCell>
              <TableCell className="font-semibold">{record.closingStock}</TableCell>
              <TableCell>{record.foodQty}</TableCell>
              <TableCell>{record.gramsOfFoodPerHen}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteRecord(index)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}