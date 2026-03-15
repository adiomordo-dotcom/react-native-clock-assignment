import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ClockDialProps, MarkingType } from './types';
export { MarkingType } from './types';
import { clockSizesUtils } from '../../utils';

const Line = ({ index }: { index: number }) =>
    <View style={[styles.markerContainer, { transform: [{ rotate: `${index * 30}deg` }] }]}>
        <View style={index % 3 === 0 ? styles.thickLine : styles.line} />
    </View>;

const Number = ({ index }: { index: number }) =>
    <View style={[styles.markerContainer, { transform: [{ rotate: `${index * 30}deg` }] }]}>
        <Text style={[index % 3 === 0 ? styles.thickNumber : styles.number, { transform: [{ rotate: `-${index * 30}deg` }] }]}>
            {index}
        </Text>
    </View>;

const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

const ClockDial = ({ size, markingType = MarkingType.NUMBERS }: ClockDialProps) => {
    const shouldRenderNumbers = markingType === MarkingType.NUMBERS;
    const { dotSize } = clockSizesUtils.getClockSizes(size);

    return (
        <View style={[styles.dial, { width: size, height: size, borderRadius: size / 2 }]}>
            <View style={[styles.centerDot, { width: dotSize, height: dotSize, borderRadius: dotSize / 2 }]} />
            {numbers.map((index) =>
                shouldRenderNumbers
                    ? <Number key={`number-${index}`} index={index} />
                    : <Line key={`line-${index}`} index={index} />
            )}
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
    },
    centerDot: {
        backgroundColor: '#1F1F1F',
    },
    line: {
        width: 2, height: 10, backgroundColor: 'black'
    },
    thickLine: {
        width: 4, height: 20, backgroundColor: 'black'
    },
    number: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    thickNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    markerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
