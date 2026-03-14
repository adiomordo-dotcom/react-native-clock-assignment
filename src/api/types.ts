export interface Timezone {
    countryCode: string;
    countryName: string;
    zoneName: string;
    gmtOffset: number;
    timestamp: number;
}

export interface TimezonesApiResponse {
    status: string;
    message: string;
    zones: Timezone[];
}
