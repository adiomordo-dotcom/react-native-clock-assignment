/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, Text } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import useTimezones from './src/hooks/useTimezones';
import AnalogClock from './src/components/AnalogClock';
import TimezoneSelector from './src/components/TimezoneSelector';
import { formatTimezoneName } from './src/utils/timezone';
import { Timezone } from './src/api/types';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { timezones, loading } = useTimezones();
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone | undefined>(undefined);

  const onTimezoneSelect = (timezone: Timezone) => {
    setSelectedTimezone(timezone);
  }

  return (
    <SafeAreaView style={styles.container}>
      <AnalogClock timezone={selectedTimezone} />
      <Text>{selectedTimezone && `${selectedTimezone.countryName} - ${formatTimezoneName(selectedTimezone.zoneName)}`}</Text>
      <TimezoneSelector
        timezones={timezones}
        loading={loading}
        onSelect={onTimezoneSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
