import { useState } from 'react';

export const processConditions = (conditions) => {
    // this will become more sophisticated soon
    // e.g., obstruction reports take precedence and reports have an expiration time/date
    // or a special alert for obsructed or damaged trail reports until overwritten by newer report (!)
    // and when reports are matched in number, newer reports take precedence
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

export default function ReportConditions({ pageID, condSubmit, setCondSubmit }) {
    const [conditions, setConditions] = useState('not selected');
    // const [condSubmit, setCondSubmit] = useState('not-submitted');

    // console.log(`Props passed: ${pageID}`);

    const handleChange = (e) => {
        e.preventDefault();
        setConditions(e.target.value);
        console.log(`Selected: ${e.target.value}`);
    }

    const handleClick = () => {
        setCondSubmit('pending');
        document.getElementById('select-conditions').setAttribute('disabled', 'disabled');
        fetch(`/api/trail-condition?localeId=${pageID}&condReport=${conditions}`,
        {
            method: 'POST'
        })
        .then((response) => {
            // console.log(response.status)
            return response.json();
        })
        .then((response) => {
            // console.log(`Report recorded: ${response.modifiedCount}`);
            if (response.modifiedCount === 1) {
                setCondSubmit('submitted');
                setTimeout(() => {
                    document.getElementById('submitted-button').style.opacity = '.5';
                }, 500)                  
            } else {
                setCondSubmit('failed');
                setTimeout(() => {
                    setCondSubmit('not-submitted');
                    document.getElementById('select-conditions').removeAttribute('disabled');
                }, 2500)
            }
        });
    }

    // console.log(`Selected: ${conditions}`);

    return (
        <div>
            <label htmlFor="select-conditions" className="conditions-label">Report current conditions:</label>
            <br />
            <select name="conditions-report" id="select-conditions" onChange={handleChange}>
                <option value="">-- Choose conditions --</option>
                <option value="dry">Dry</option>
                <option value="dry-dusty">Dry and dusty</option>
                <option value="heavy-snow">Heavy snow and ice</option>
                <option value="light-snow">Light snow in spots</option>
                <option value="muddy">Wet and muddy</option>
                <option value="obstructed">Damaged or obstructed</option>
            </select>
            <br />
            {
                condSubmit === 'not-submitted' &&
                <button className="btn btn-primary btn-report" onClick={handleClick}>Submit</button>
            }
            {
                condSubmit === 'pending' &&
                <button className="btn btn-primary btn-report submit-pending"><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
            }
            {
                condSubmit === 'submitted' &&
                <button className="btn btn-success btn-report submitted" id="submitted-button"><i className="fa-solid fa-circle-check"></i></button>
            }   
            {
                condSubmit === 'failed' &&
                <div>
                    <button className="btn btn-danger btn-report failed"><i className="fa-regular fa-circle-xmark"></i></button>
                    <div className="small-warning">Something went wrong!</div>
                </div>
            }                        
        </div>
    )
}