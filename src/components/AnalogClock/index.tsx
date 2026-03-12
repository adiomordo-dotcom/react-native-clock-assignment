import React from 'react'
import { View } from 'react-native'
import { CLOCK_SIZE } from '../constants';
import { useClockTime } from '../../hooks/useClockTime ';
import ClockDial from '../ClockDial';
import ClockHand, { HandType } from '../ClockHand';

const AnalogClock = () => {
    const { secondValue, minuteValue, hourValue } = useClockTime();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ClockDial size={CLOCK_SIZE} />
            <ClockHand clockSize={CLOCK_SIZE} value={hourValue} handType={HandType.HOUR} />
            <ClockHand clockSize={CLOCK_SIZE} value={minuteValue} handType={HandType.MINUTE} />
            <ClockHand clockSize={CLOCK_SIZE} value={secondValue} handType={HandType.SECOND} />
        </View>
    )
}

export default AnalogClock;