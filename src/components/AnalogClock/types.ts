import { MarkingType } from '../ClockDial/types';
import { Timezone } from '../../api/types';

export type AnalogClockProps = {
    markingType?: MarkingType;
    timezone: Timezone | undefined;
}
