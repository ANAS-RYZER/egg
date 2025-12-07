import { useState, useCallback } from 'react'
import api from '@/app/httpClient'
import { FarmData } from '@/app/lib/types'

const useFetchSingleFarm = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [farm, setFarm] = useState<FarmData | null>(null)

    const fetchSingleFarm = useCallback(async (id: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.get(`/api/farms/${id}`)
            const data = response.data.farmsdetailsById

            if (!data) {
                throw new Error('Farm not found')
            }

            const mappedFarm: FarmData = {
                ...data,
                farmName: data.name,
                // Ensure other fields match FarmData interface
            }
            setFarm(mappedFarm)
        } catch (err: any) {
            console.error('Error fetching farm:', err)
            setError(err.message || 'Failed to fetch farm')
        } finally {
            setLoading(false)
        }
    }, [])

    return { farm, loading, error, fetchSingleFarm }
}

export default useFetchSingleFarm