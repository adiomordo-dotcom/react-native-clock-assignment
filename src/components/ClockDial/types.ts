export enum MarkingType {
    NUMBERS = 'numbers',
    LINES = 'lines',
}

export type ClockDialProps = {
    size: number;
    markingType?: MarkingType;
}
