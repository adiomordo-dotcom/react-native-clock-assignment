import React, { createContext, useContext, useState } from 'react';
import { Timezone } from '../api/types';
import { saveSelectedTimezone } from '../db';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface TimezoneProviderProps {
    children: React.ReactNode;
    initialTimezone?: Timezone;
    db?: SQLiteDatabase;
}

interface TimezoneContextValue {
    selectedTimezone: Timezone | undefined;
    setSelectedTimezone: (timezone: Timezone) => void;
}

const TimezoneContext = createContext<TimezoneContextValue | undefined>(undefined);

export function TimezoneProvider({ children, initialTimezone, db }: TimezoneProviderProps) {
    const [selectedTimezone, setSelectedTimezone] = useState<Timezone | undefined>(initialTimezone);
    const _saveSelectedTimezone = async (timezone: Timezone) => {
        if (db) {
            try {
                await saveSelectedTimezone(db, JSON.stringify(timezone));
            } catch (error) {
                console.error('Error saving selected timezone:', error);
            }
        }
        setSelectedTimezone(timezone);
    }
    return (
        <TimezoneContext.Provider value={{ selectedTimezone, setSelectedTimezone: _saveSelectedTimezone }}>
            {children}
        </TimezoneContext.Provider>
    )
}

export function useSelectedTimezone() {
    const context = useContext(TimezoneContext);
    if (!context) throw new Error('useSelectedTimezone must be used within TimezoneProvider');
    return context;
}