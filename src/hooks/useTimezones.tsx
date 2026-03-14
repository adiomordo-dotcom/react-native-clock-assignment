import React, { useEffect, useState } from 'react'
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import NetInfo from '@react-native-community/netinfo';
import { getTimezonesAsync, Timezone } from '../api'
import { addBulkTimezones, getTimezones } from '../db';

function useTimezones(db?: SQLiteDatabase) {
    const [timezones, setTimezones] = useState<Timezone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimezones = async () => {
            try {
                const { isConnected } = await NetInfo.fetch();
                if (isConnected) {
                    const data = await getTimezonesAsync();
                    setTimezones(data);
                    if (db) {
                        await addBulkTimezones(db, data);
                    }
                } else {
                    if (db) {
                        const cached = await getTimezones(db);
                        setTimezones(cached);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch timezones:', error);
                if (db) {
                    const cached = await getTimezones(db);
                    setTimezones(cached);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTimezones();
    }, [db]);

    return { timezones, loading };
}

export default useTimezones