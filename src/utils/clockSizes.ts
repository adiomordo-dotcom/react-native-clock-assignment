import { HandType } from "../components/ClockHand/types";

export const getClockSizes = (size: number) => ({
    dotSize: size * 0.04,
    tickWidth: size * 0.01,
    tickHeight: size * 0.05,
    thickTickWidth: size * 0.02,
    thickTickHeight: size * 0.1,
    fontSize: size * 0.08,
    thickFontSize: size * 0.1,
});

export const getHandSizes = (clockSize: number, handType: HandType) => {
    const radius = clockSize / 2;
    const sizes = {
        [HandType.HOUR]: { width: radius * 0.02, length: radius * 0.65 },
        [HandType.MINUTE]: { width: radius * 0.015, length: radius * 0.85 },
        [HandType.SECOND]: { width: radius * 0.008, length: radius * 0.90 },
    };
    return sizes[handType];
};