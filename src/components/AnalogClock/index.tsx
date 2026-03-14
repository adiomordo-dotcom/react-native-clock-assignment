import React from 'react'
import { View, StyleSheet } from 'react-native'
import { CLOCK_SIZE } from '../../constants';
import { useClockTime } from '../../hooks/useClockTime ';
import ClockDial, { MarkingType } from '../ClockDial';
import ClockHand, { HandType } from '../ClockHand';
import { AnalogClockProps } from './types';
export { MarkingType } from '../ClockDial';

const AnalogClock = ({ markingType = MarkingType.NUMBERS, timezone }: AnalogClockProps) => {
    const { secondValue, minuteValue, hourValue } = useClockTime(timezone);
    return (
        <View style={styles.container}>
            <ClockDial size={CLOCK_SIZE} markingType={markingType} />
            <ClockHand clockSize={CLOCK_SIZE} value={hourValue} handType={HandType.HOUR} />
            <ClockHand clockSize={CLOCK_SIZE} value={minuteValue} handType={HandType.MINUTE} />
            <ClockHand clockSize={CLOCK_SIZE} value={secondValue} handType={HandType.SECOND} />
        </View>
    )
}

export default AnalogClock;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        flex: 1
    }
});