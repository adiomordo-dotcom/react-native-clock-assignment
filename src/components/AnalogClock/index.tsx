import React from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { useClockTime } from '../../hooks';
import ClockDial, { MarkingType } from '../ClockDial';
import ClockHand, { HandType } from '../ClockHand';
import { AnalogClockProps } from './types';
export { MarkingType } from '../ClockDial';

const AnalogClock = ({ markingType = MarkingType.NUMBERS, timezone, showMinuteHand = true, showSecondHand = true }: AnalogClockProps) => {
    const { secondValue, minuteValue, hourValue } = useClockTime(timezone);
    const { width, height } = useWindowDimensions();
    const clockSize = Math.min(width, height) * 0.7;

    return (
        <View style={styles.container}>
            <ClockDial size={clockSize} markingType={markingType} />
            <ClockHand clockSize={clockSize} value={hourValue} handType={HandType.HOUR} />
            {showMinuteHand && <ClockHand clockSize={clockSize} value={minuteValue} handType={HandType.MINUTE} />}
            {showSecondHand && <ClockHand clockSize={clockSize} value={secondValue} handType={HandType.SECOND} />}
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