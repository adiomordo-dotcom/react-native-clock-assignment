import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { getInitialTime } from '../utils/time';

export const useClockTime = () => {
    const { initialSeconds, initialMinutes, initialHours } = getInitialTime();
    const secondValue = useRef<Animated.Value>(new Animated.Value(initialSeconds)).current;
    const minuteValue = useRef<Animated.Value>(new Animated.Value(initialMinutes)).current;
    const hourValue = useRef<Animated.Value>(new Animated.Value(initialHours)).current;

    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
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
    }, []);

    return {
        secondValue,
        minuteValue,
        hourValue,
    };
};