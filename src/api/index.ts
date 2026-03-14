import { API_URL, API_KEY } from '../constants';
import { Timezone, TimezonesApiResponse } from './types';
export type { Timezone };

export const getTimezonesAsync = async (): Promise<Timezone[]> => {
    try {
        const response = await fetch(
            `${API_URL}/list-time-zone?key=${API_KEY}&format=json`,
        );
        const json: TimezonesApiResponse = await response.json();
        return json.zones;
    } catch (error) {
        console.error(error);
        return [];
    }
};
