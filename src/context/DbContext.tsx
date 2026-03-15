import { createContext, useState, useContext, useEffect } from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { initDB } from "../db";

interface DbProviderProps {
    children: React.ReactNode;
}

interface DbContextValue {
    db: SQLiteDatabase | undefined;
    isReady: boolean;
}

const DbContext = createContext<DbContextValue | undefined>(undefined);

export function DbProvider({ children }: DbProviderProps) {
    const [db, setDb] = useState<SQLiteDatabase | undefined>(undefined);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initDb = async () => {
            try {
                const db = await initDB();
                setDb(db);
            } catch (error) {
                console.error('Error initializing database:', error);
            } finally {
                setIsReady(true);
            }
        }
        initDb();
    }, []);

    return <DbContext.Provider value={{ db, isReady }}>{children}</DbContext.Provider>
}

export const useDb = () => {
    const context = useContext(DbContext);
    if (!context) throw new Error('useDb must be used within DbProvider');
    return context;
};