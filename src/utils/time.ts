import { Timezone } from "../api";

export const getInitialTime = (timezone: Timezone | undefined) => {
    console.log('timezone', timezone);
    const now = new Date();
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