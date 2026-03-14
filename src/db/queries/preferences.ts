import type { SQLiteDatabase } from 'react-native-sqlite-storage';

const SELECTED_TIMEZONE_KEY = 'selected_timezone';

export const getSelectedTimezone = async (db: SQLiteDatabase) => {
    const selectQuery = 'SELECT value FROM Preferences WHERE key = ?';
    try {
        const [results] = await db.executeSql(selectQuery, [SELECTED_TIMEZONE_KEY]);
        if (results.rows.length > 0) {
            return results.rows.item(0).value;
        }

    } catch (error) {
        throw Error('Failed to get selected timezone');
    }
};

export const saveSelectedTimezone = async (db: SQLiteDatabase, value: string) => {
    const insertQuery = 'INSERT OR REPLACE INTO Preferences (key, value) VALUES (?, ?)';
    try {
        return await db.executeSql(insertQuery, [SELECTED_TIMEZONE_KEY, value]);
    } catch (error) {
        console.error('Error saving preference:', error);
        throw Error('Failed to save selected timezone');
    }
}