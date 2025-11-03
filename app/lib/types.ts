export interface ProductionRecord {
    id: string
    farmId: string
    date: string
    shedNo: string
    age: number
    mortality: number
    openingStock: number
    closingStock: number
    foodQty: number
    gramsOfFoodPerHen: number
    createdAt: string
  }
  
  export interface FarmData {
    id: string
    farmName: string
    location: string
    totalSheds: number
    ownerName?: string
    createdDate: string
    records?: ProductionRecord[]
  }