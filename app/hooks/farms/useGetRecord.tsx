import { useState, useCallback } from 'react';
import api from '@/app/httpClient';
import { ProductionRecord } from '@/app/lib/types';

const useGetRecord = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [records, setRecords] = useState<ProductionRecord[]>([]);

    const fetchRecords = useCallback(async (farmId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/api/farms/${farmId}/records`);
            // Assuming the API returns { records: [...] } or similar. 
            // Adjusting to handle potential response structures safely.
            const fetchedRecords = response.data.records || response.data || [];
            setRecords(fetchedRecords);
        } catch (err: any) {
            console.error('Error fetching records:', err);
            setError(err.message || 'Failed to fetch records');
        } finally {
            setLoading(false);
        }
    }, []);

    return { records, loading, error, fetchRecords };
};

export default useGetRecord;