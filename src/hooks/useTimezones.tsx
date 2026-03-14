import React, { useEffect, useState } from 'react'
import { getTimezonesAsync, Timezone} from '../api'

function useTimezones() {
    const [timezones, setTimezones] = useState<Timezone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTimezonesAsync().then((timezones) => {
            setTimezones(timezones);
            setLoading(false);
        });
    }, []);

    return { timezones, loading };
}

export default useTimezones