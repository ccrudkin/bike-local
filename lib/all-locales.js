// library for fetching data and exporting data here
import { trails } from '../data/locales';

export function getTrailData(idNum) {
    let trailData = '';
    for (let i = 0; i < trails.length; i++) {
        if (trails[i].id === idNum) {
            trailData = trails[i];
        }
    }
    return trailData;
}

export function getTrailIDs() {
    return trails.map((trail) => {
        return {
            params: {
                localeId: trail.id,
            },
        };
    });
}