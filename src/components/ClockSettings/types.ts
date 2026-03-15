import { MarkingType } from '../AnalogClock';

export interface ClockSettings {
    markingType: MarkingType;
    showMinuteHand: boolean;
    showSecondHand: boolean;
}

export interface ClockSettingsPanelProps {
    settings: ClockSettings;
    onChange: (settings: ClockSettings) => void;
}
