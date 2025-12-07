import { useState } from 'react';
import api from '@/app/httpClient';
import { FarmData } from '@/app/lib/types';

const useAddFarm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addFarm = async (farmData: FarmData) => {
        setLoading(true);
        setError(null);

        try {
            // Map frontend FarmData to API payload
            // Based on the curl command provided:
            // { "name": "...", "location": "...", "totalSheds": 5, "ownerName": "..." }
            const payload = {
                name: farmData.farmName,
                location: farmData.location,
                totalSheds: farmData.totalSheds,
                ownerName: farmData.ownerName,
                // Including new fields as they are likely needed by the backend now
                capacity: farmData.capacity,
                type: farmData.type,
            };

            const response = await api.post('/api/farms', payload);
            return response.data;
        } catch (err: any) {
            console.error('Error adding farm:', err);
            const errorMessage = err.response?.data?.message || err.message || 'Failed to add farm';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { addFarm, loading, error };
};

export default useAddFarm;
