import React from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { ClockHandProps, HAND_RANGE, HandType } from './types';
import { getHandSizes } from '../../utils/clockSizes';
export { HandType } from './types';

export const HAND_COLOR: Record<HandType, string> = {
    [HandType.HOUR]: '#212121',
    [HandType.MINUTE]: '#1565C0',
    [HandType.SECOND]: '#E53935',
};

const ClockHand = ({ clockSize, value, handType }: ClockHandProps) => {
    const { width, length } = getHandSizes(clockSize, handType);
    const rotation = value.interpolate({
        inputRange: [0, HAND_RANGE[handType]],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.hand, { height: length, width: width, transform: [{ rotate: rotation }], backgroundColor: HAND_COLOR[handType] }]} />
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
        transformOrigin: 'bottom'
    },
});