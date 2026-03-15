import React, { createContext, useContext, useEffect, useState } from 'react';
import { Timezone } from '../api/types';
import { getSelectedTimezone, saveSelectedTimezone } from '../db';
import { useDb } from './DbContext';

interface TimezoneContextValue {
    selectedTimezone: Timezone | undefined;
    setSelectedTimezone: (timezone: Timezone) => void;
}

const TimezoneContext = createContext<TimezoneContextValue | undefined>(undefined);

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
    const { db } = useDb();
    const [selectedTimezone, setSelectedTimezone] = useState<Timezone | undefined>(undefined);

    useEffect(() => {
        if (!db) return;
        const loadSaved = async () => {
            try {
                const raw = await getSelectedTimezone(db);
                const saved = raw ? JSON.parse(raw) as Timezone : undefined;
                if (saved) setSelectedTimezone(saved);
            } catch (error) {
                console.error('Failed to load saved timezone:', error);
            }
        };
        loadSaved();
    }, [db]);

    const _saveSelectedTimezone = async (timezone: Timezone) => {
        if (db) {
            try {
                await saveSelectedTimezone(db, JSON.stringify(timezone));
            } catch (error) {
                console.error('Error saving selected timezone:', error);
            }
        }
        setSelectedTimezone(timezone);
    };

    return (
        <TimezoneContext.Provider value={{ selectedTimezone, setSelectedTimezone: _saveSelectedTimezone }}>
            {children}
        </TimezoneContext.Provider>
    );
}

export function useSelectedTimezone() {
    const context = useContext(TimezoneContext);
    if (!context) throw new Error('useSelectedTimezone must be used within TimezoneProvider');
    return context;
}
