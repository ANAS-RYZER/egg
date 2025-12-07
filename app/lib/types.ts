export interface ProductionRecord {
    id: string
    farmId: string
    date: string
    shedNo: number
    age: number
    mortality: number
    openingStock: number
    closingStock: number
    foodQty: number
    gramsOfFoodPerHen: number
    createdAt: string
  }
  
export interface FarmData {
    _id: string
    farmName: string
    location: string
    totalSheds: number
    capacity: number
    type: 'layer' | 'broiler' | 'breeder'
    ownerName?: string
    createdDate: string
    records?: ProductionRecord[]
  }