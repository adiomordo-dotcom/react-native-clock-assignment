import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CLOCK_SIZE, DOT_SIZE } from '../constants';
import { ClockDialProps } from './types';


const ClockDial = ({ size }: ClockDialProps) => {
    return (
        <View style={[styles.dial, { width: size, height: size }]}>
            <View style={styles.centerDot} />
        </View>
    )
}

export default ClockDial;

const styles = StyleSheet.create({
    dial: {
        backgroundColor: '#FFFFFF',
        borderWidth: 4,
        borderColor: '#1F1F1F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    centerDot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: 6,
        backgroundColor: '#1F1F1F',
    },
});