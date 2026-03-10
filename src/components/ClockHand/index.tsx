import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ClockHandProps } from './types';

const HAND_SIZE = 3;

const ClockHand = ({ clockSize }: ClockHandProps) => {
    return (
        <View style={styles.container}>
            <View style={[styles.hand, { height: (clockSize / 2) * 0.8 }]} />
        </View>
    )
}

export default ClockHand;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hand: {
        position: 'absolute',
        bottom: '50%',
        backgroundColor: '#1F1F1F',
        borderRadius: 6,
        width: HAND_SIZE,
    },
});