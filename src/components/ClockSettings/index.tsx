import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { MarkingType } from '../AnalogClock';
import { ClockSettingsPanelProps } from './types';

const SettingRow = ({ label, value, onChange }: { label: string; value: boolean; onChange: (value: boolean) => void }) => (
    <View style={styles.settingRow}>
        <Text>{label}</Text>
        <Switch value={value} onValueChange={onChange} />
    </View>
);

const ClockSettingsPanel = ({ settings, onChange }: ClockSettingsPanelProps) => (
    <View style={styles.settingContainer}>
        <Text style={styles.settingTitle}>Settings</Text>
        <SettingRow
            label="Markers - Numbers"
            value={settings.markingType === MarkingType.NUMBERS}
            onChange={(val) => onChange({ ...settings, markingType: val ? MarkingType.NUMBERS : MarkingType.LINES })}
        />
        <SettingRow
            label="Show Minute Hand"
            value={settings.showMinuteHand}
            onChange={(val) => onChange({ ...settings, showMinuteHand: val })}
        />
        <SettingRow
            label="Show Second Hand"
            value={settings.showSecondHand}
            onChange={(val) => onChange({ ...settings, showSecondHand: val })}
        />
    </View>
);

export default ClockSettingsPanel;

const styles = StyleSheet.create({
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    settingContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
