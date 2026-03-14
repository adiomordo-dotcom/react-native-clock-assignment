export interface Timezone {
    countryCode: string;
    countryName: string;
    zoneName: string;
    gmtOffset: number;
    timestamp: number;
}

export interface TimezoneItemProps {
    timezone: Timezone;
    onSelect: (timezone: Timezone) => void;
}

export interface TimezoneSelectorProps {
    timezones: Timezone[];
    loading: boolean;
}