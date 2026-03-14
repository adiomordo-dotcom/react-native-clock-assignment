import type { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Timezone } from '../../api/types';

export const addBulkTimezones = async (db: SQLiteDatabase, timezones: Timezone[]) => {
    return db.transaction((tx) => {
        timezones.forEach((tz) => {
            tx.executeSql(
                `INSERT OR REPLACE INTO Timezones (zoneName, countryName, gmtOffset) VALUES (?, ?, ?)`,
                [tz.zoneName, tz.countryName, tz.gmtOffset]
            );
        });
    });
};

export const getTimezones = async (db: SQLiteDatabase): Promise<Timezone[]> => {
    const selectQuery = `SELECT * FROM Timezones ORDER BY countryName ASC`;
    try {
        const [results] = await db.executeSql(selectQuery);
        const data: Timezone[] = [];

        for (let i = 0; i < results.rows.length; i++) {
            data.push(results.rows.item(i));
        }
        return data; // Now it's a clean array for your FlatList
    } catch (error) {
        console.error(error);
        return [];
    }
};