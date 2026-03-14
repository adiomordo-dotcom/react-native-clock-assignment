import { enablePromise, openDatabase } from 'react-native-sqlite-storage';
import type { SQLiteDatabase } from 'react-native-sqlite-storage';

const databaseConfig = {
    name: 'ClockApp.db',
    location: 'default',
};

let db: SQLiteDatabase;

enablePromise(true)

const getDBConnection = async () => {
    if (!db) {
        db = await openDatabase(databaseConfig);
    }
    return db;
};

export const initDB = async () => {
    const db = await getDBConnection();
    await createTables(db);
    return db;
};

const createTables = async (db: SQLiteDatabase) => {
    console.log('Creating tables...');
    const timezonesQuery = `
      CREATE TABLE IF NOT EXISTS Timezones (
          zoneName TEXT,
          countryName TEXT,
          gmtOffset INTEGER,
          PRIMARY KEY(zoneName)
      )
    `

    const preferencesQuery = `
    CREATE TABLE IF NOT EXISTS Preferences  (
        key TEXT,
        value TEXT,
        PRIMARY KEY(key)
    )
  `

    try {
        await db.executeSql(timezonesQuery)
        await db.executeSql(preferencesQuery)
    } catch (error) {
        console.error(error);
        throw Error('Failed to create tables');
    }
};