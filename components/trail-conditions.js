import { useState } from 'react';
import { trails } from '../data/locales';

export const getCurrentConditions = (idNum) => {
    // this will become more sophisticated soon
    // e.g., obstruction reports take precedence and reports have an expiration time/date
    // or a special alert for obsructed or damaged trail reports until overwritten by newer report (!)
    let mostReports = 0;
    let mostReported = 'not reported';
    let display = {
        "dry": "dry",
        "dry-dusty": "dry and dusty",
        "heavy-snow": "heavy snow and ice",
        "light-snow": "light snow in spots",
        "muddy": "wet and muddy",
        "obstructed": "damaged or obstructed",        
    }
    for (let i = 0; i < trails.length; i++) {
        if (trails[i].id === idNum) {
            // console.log(`This trail is: ${trails[i].id}`);
            for (const cond in trails[i].conditions) {
                // console.log(`Location: ${trails[i].id} Condition: ${cond} / Reports: \n${trails[i].conditions[cond].length}`);
                if (trails[i].conditions[cond].length > mostReports) {
                    // console.log(`Condition: ${cond} / Reports: \n${trails[i].conditions[cond].length}`);
                    mostReports = trails[i].conditions[cond].length;
                    mostReported = cond;
                }
            }
        }
    }
    return display[mostReported];
}

export default function ReportConditions() {
    const [conditions, setConditions] = useState('not reported');

    const handleChange = (e) => {
        e.preventDefault();
        setConditions(e.target.value);
        console.log(`Selected: ${e.target.value}`);
    }

    // console.log(`Selected: ${conditions}`);

    return (
        <div>
            <label htmlFor="select-conditions">Report conditions:</label>
            <br />
            <select name="conditions-report" id="select-conditions" onChange={handleChange}>
                <option value="">-- Choose conditions to report --</option>
                <option value="dry">Dry</option>
                <option value="dry-dusty">Dry and dusty</option>
                <option value="heavy-snow">Heavy snow and ice</option>
                <option value="light-snow">Light snow in spots</option>
                <option value="muddy">Wet and muddy</option>
                <option value="obstructed">Damaged or obstructed</option>
            </select>
        </div>
    )
}