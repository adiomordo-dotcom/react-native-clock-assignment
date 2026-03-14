/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import useTimezones from './src/hooks/useTimezones';
import AnalogClock from './src/components/AnalogClock';
import TimezoneSelector from './src/components/TimezoneSelector';
import { formatTimezoneName } from './src/utils/timezone';
import { TimezoneProvider, useSelectedTimezone } from './src/context/TimezoneContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TimezoneProvider>
        <AppContent />
      </TimezoneProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { timezones, loading } = useTimezones();
  const { selectedTimezone, setSelectedTimezone } = useSelectedTimezone();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.clockSection}>
        <AnalogClock timezone={selectedTimezone} />
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
      </View>
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
    flex: 1,                    // top half
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
    borderBottomColor: '#E0E0E0',
  },
  controlsSection: {
    flex: 1,                    // bottom half
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
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
