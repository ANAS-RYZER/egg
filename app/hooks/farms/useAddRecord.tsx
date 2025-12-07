import { useState } from 'react';
import api from '@/app/httpClient';
import { ProductionRecord } from '@/app/lib/types';



const useAddRecord = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addRecord = async (farmId: string, recordData: ProductionRecord) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(`/api/farms/${farmId}/records`, recordData);
            return response.data;
        } catch (err: any) {
            console.error('Error adding record:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to add record';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { addRecord, loading, error };
};

export default useAddRecord;
