import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { timeUtils } from '../utils';
import { Timezone } from '../api/types';

export const useClockTime = (timezone: Timezone | undefined) => {
    const secondValue = useRef(new Animated.Value(0)).current;
    const minuteValue = useRef(new Animated.Value(0)).current;
    const hourValue = useRef(new Animated.Value(0)).current;

    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const { initialSeconds, initialMinutes, initialHours } = timeUtils.getInitialTime(timezone);
        secondValue.setValue(initialSeconds);
        minuteValue.setValue(initialMinutes);
        hourValue.setValue(initialHours);

        startTimeRef.current = null;

        const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
                startTimeRef.current = timestamp;
            }

            const elapsedSeconds = (timestamp - startTimeRef.current) / 1000;

            secondValue.setValue((initialSeconds + elapsedSeconds) % 60);
            minuteValue.setValue((initialMinutes + elapsedSeconds / 60) % 60);
            hourValue.setValue((initialHours + elapsedSeconds / 3600) % 12);

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [timezone]);

    return {
        secondValue,
        minuteValue,
        hourValue,
    };
};