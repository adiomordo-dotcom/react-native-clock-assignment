import { Animated } from "react-native";

export enum HandType {
    HOUR = 'HOUR',
    MINUTE = 'MINUTE',
    SECOND = 'SECOND',
}

export type ClockHandProps = {
    clockSize: number;
    value: Animated.Value;
    handType: HandType;
}

export const HAND_RANGE: Record<HandType, number> = {
    [HandType.HOUR]: 12,
    [HandType.MINUTE]: 60,
    [HandType.SECOND]: 60,
};