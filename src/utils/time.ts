export const getInitialTime = () => {
    const now = new Date();
    const initialSeconds = now.getSeconds();
    const initialMinutes = now.getMinutes() + initialSeconds / 60;
    const initialHours = (now.getHours() % 12) + initialMinutes / 60;

    return {
        initialSeconds,
        initialMinutes,
        initialHours,
    }
}