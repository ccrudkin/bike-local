import { useState } from 'react';

export const processConditions = (conditions) => {
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

    // console.log(`This trail is: ${trails[i].id}`);
    for (const cond in conditions) {
        // console.log(`Location: ${trails[i].id} Condition: ${cond} / Reports: \n${trails[i].conditions[cond].length}`);
        if (conditions[cond].length > mostReports) {
            // console.log(`Condition: ${cond} / Reports: \n${trails[i].conditions[cond].length}`);
            mostReports = conditions[cond].length;
            mostReported = cond;
        }
    }
    return display[mostReported];
}

export default function ReportConditions({ pageID }) {
    const [conditions, setConditions] = useState('not reported');

    // console.log(`Props passed: ${pageID}`);

    const handleChange = (e) => {
        e.preventDefault();
        setConditions(e.target.value);
        console.log(`Selected: ${e.target.value}`);
    }

    const handleClick = () => {
        fetch(`/api/trail-condition?localeId=${pageID}&condReport=${conditions}`,
        {
            method: 'POST'
        })
        .then((response) => {
            console.log(response.status)
            return response.json();
        })
        .then((response) => {
            console.log(`Report response: ${JSON.stringify(response)}`);
            // UP SOON: change or disable the button and give confirmation here
        });
    }

    // console.log(`Selected: ${conditions}`);

    return (
        <div>
            <label htmlFor="select-conditions" className="conditions-label">Report current conditions:</label>
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
            <br />
            <button className="btn btn-primary" onClick={handleClick}>Submit</button>
        </div>
    )
}