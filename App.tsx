/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useTimezones } from './src/hooks';
import AnalogClock, { MarkingType } from './src/components/AnalogClock';
import TimezoneSelector from './src/components/TimezoneSelector';
import OfflineBanner from './src/components/OfflineBanner/offlineBanner';
import ClockSettingsPanel from './src/components/ClockSettings';
import { formatTimezoneName } from './src/utils/timezone';
import { TimezoneProvider, useSelectedTimezone } from './src/context/TimezoneContext';
import { initDB, getSelectedTimezone } from './src/db';
import { Timezone } from './src/api/types';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

function App() {
  const [isDbReady, setIsDbReady] = useState(false);
  const [db, setDb] = useState<SQLiteDatabase | undefined>(undefined);
  const [initialTimezone, setInitialTimezone] = useState<Timezone | undefined>(undefined);

  const loadData = useCallback(async () => {
    try {
      const db = await initDB()
      setDb(db);
      const raw = await getSelectedTimezone(db);
      const savedTimezone = raw ? JSON.parse(raw) as Timezone : undefined;
      if (savedTimezone) {
        setInitialTimezone(savedTimezone);
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsDbReady(true)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])


  if (!isDbReady) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </SafeAreaView>
      </SafeAreaProvider >
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar />
      <TimezoneProvider db={db} initialTimezone={initialTimezone} >
        <AppContent db={db} />
      </TimezoneProvider>
    </SafeAreaProvider>
  );
}


function AppContent({ db }: { db?: SQLiteDatabase }) {
  const { timezones, loading } = useTimezones(db);
  const { selectedTimezone, setSelectedTimezone } = useSelectedTimezone();
  const [clockSettings, setClockSettings] = useState({
    markingType: MarkingType.NUMBERS,
    showMinuteHand: true,
    showSecondHand: true,
  });


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.clockSection}>
        <AnalogClock
          timezone={selectedTimezone}
          markingType={clockSettings.markingType}
          showMinuteHand={clockSettings.showMinuteHand}
          showSecondHand={clockSettings.showSecondHand}
        />
        <View style={styles.timezoneLabel}>
          <Text style={styles.countryName}>
            {selectedTimezone ? selectedTimezone.countryName : 'Local Time'}
          </Text>
          <Text style={styles.zoneName}>
            {selectedTimezone
              ? formatTimezoneName(selectedTimezone.zoneName)
              : Intl.DateTimeFormat().resolvedOptions().timeZone}
          </Text>
        </View>
      </View>
      <View style={styles.controlsSection}>
        <TimezoneSelector
          timezones={timezones}
          loading={loading}
          onSelect={setSelectedTimezone}
        />
        <ClockSettingsPanel settings={clockSettings} onChange={setClockSettings} />
      </View>
      <OfflineBanner />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
    borderBottomColor: '#E0E0E0',
  },
  controlsSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

  },
  timezoneLabel: {
    alignItems: 'center',
    marginVertical: 10
  },
  countryName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  zoneName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default App;
