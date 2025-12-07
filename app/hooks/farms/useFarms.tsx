import { useState, useEffect, useCallback } from 'react';
import api from '@/app/httpClient';
import { FarmData } from '@/app/lib/types';

const useFarms = () => {
    const [farms, setFarms] = useState<FarmData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFarms = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/api/farms');
            // Map backend 'name' to frontend 'farmName' if necessary
       
            setFarms(response.data.farms);
        } catch (err: any) {
            console.error('Error fetching farms:', err);
            setError(err.message || 'Failed to fetch farms');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFarms();
    }, [fetchFarms]);

    return { farms, loading, error, refetch: fetchFarms };
};

export default useFarms;
