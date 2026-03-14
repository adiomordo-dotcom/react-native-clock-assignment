import { Timezone } from "../api";

export const getInitialTime = (timezone: Timezone | undefined) => {
    const now = new Date();

    if (!timezone) {
        const initialSeconds = now.getSeconds();
        const initialMinutes = now.getMinutes() + initialSeconds / 60;
        const initialHours = (now.getHours() % 12) + initialMinutes / 60;
        return { initialSeconds, initialMinutes, initialHours };
    }

    const gmtOffsetInMillis = (timezone?.gmtOffset ?? 0) * 1000;
    const tzDate = new Date(now.getTime() + gmtOffsetInMillis);
    const initialSeconds = tzDate.getUTCSeconds();
    const initialMinutes = tzDate.getUTCMinutes() + initialSeconds / 60;
    const initialHours = (tzDate.getUTCHours() % 12) + initialMinutes / 60;

    return {
        initialSeconds,
        initialMinutes,
        initialHours,
    }
}