import React, { createContext, useContext, useMemo, useState } from 'react';
import { Timezone } from '../api/types';

interface TimezoneContextValue {
    selectedTimezone: Timezone | undefined;
    setSelectedTimezone: (timezone: Timezone) => void;
}

const TimezoneContext = createContext<TimezoneContextValue | undefined>(undefined);

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
    const [selectedTimezone, setSelectedTimezone] = useState<Timezone | undefined>(undefined);

    const value = useMemo(() => ({
        selectedTimezone,
        setSelectedTimezone
    }), [selectedTimezone]);

    return (
        <TimezoneContext.Provider value={value}>
            {children}
        </TimezoneContext.Provider>
    )
}

export function useSelectedTimezone() {
    const context = useContext(TimezoneContext);
    if (!context) throw new Error('useSelectedTimezone must be used within TimezoneProvider');
    return context;
}