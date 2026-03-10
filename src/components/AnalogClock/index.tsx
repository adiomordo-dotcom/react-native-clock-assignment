import React from 'react'
import { View, StyleSheet } from 'react-native'
import { CLOCK_SIZE } from '../constants';
import ClockDial from '../ClockDial';
import ClockHand from '../ClockHand';

const AnalogClock = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ClockDial size={CLOCK_SIZE} />
            <ClockHand clockSize={CLOCK_SIZE} />
        </View>
    )
}

export default AnalogClock;