import { Timezone } from '../../api/types';

export interface TimezoneItemProps {
    timezone: Timezone;
    onSelect: (timezone: Timezone) => void;
}

export interface TimezoneSelectorProps {
    timezones: Timezone[];
    loading: boolean;
    onSelect: (timezone: Timezone) => void;
}

export interface TimezoneListProps {
    timezones: Timezone[];
    onItemSelect: (timezone: Timezone) => void;
}