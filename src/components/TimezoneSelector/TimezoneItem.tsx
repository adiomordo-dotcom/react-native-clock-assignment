import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TimezoneItemProps } from './types';
import { ITEM_HEIGHT } from '../../constants';
import { formatTimezoneName } from '../../utils/timezone';

function TimezoneItem({ timezone, onSelect }: TimezoneItemProps) {
    const { countryName, zoneName } = timezone;
    const formattedTimezoneName = formatTimezoneName(zoneName);
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={() => onSelect(timezone)}>
            <Text style={styles.countryName} numberOfLines={1}>{countryName}</Text>
            <Text style={styles.zoneName} numberOfLines={1}>{formattedTimezoneName}</Text>
        </TouchableOpacity>
    )
}

export default React.memo(TimezoneItem);

const styles = StyleSheet.create({
    container: {
        height: ITEM_HEIGHT,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderBottomColor: '#E0E0E0',
    },
    countryName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    zoneName: {
        fontSize: 14,
        color: '#666',
    },
});