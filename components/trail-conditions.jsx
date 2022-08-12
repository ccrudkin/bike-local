import { useState } from 'react';

export const processConditions = (conditions) => {
    let display = {
        "dry": "dry",
        "dry-dusty": "dry and dusty",
        "heavy-snow": "heavy snow and ice",
        "light-snow": "light snow in spots",
        "muddy": "wet and muddy",
        "obstructed": "damaged or obstructed",
        "nodata": "nodata"
    }

    function getMostRecent() {
        let now = new Date();
        let thirtyDayLimit = new Date(now);
        thirtyDayLimit.setDate(now.getDate() - 30);
        let mostRecent = {
            condition: 'nodata',
            date: thirtyDayLimit,
        };

        for (const cond in conditions) {
            for (let i = 0; i < conditions[cond].length; i++) {
                const thisDate = new Date(conditions[cond][i]);
                if (thisDate > mostRecent.date) {
                    mostRecent = {
                        condition: display[cond],
                        date: thisDate
                    }
                }
            }
        }

        return mostRecent;
    }

    function getMostCommon() {
        let now = new Date();
        let thirtyDayLimit = new Date(now);
        thirtyDayLimit.setDate(now.getDate() - 30);
        let mostCommon = {
            condition: 'nodata',
            number: 0
        }        
        for (const cond in conditions) {
            if (conditions[cond].length > mostCommon.number) {
                mostCommon = {
                    condition: display[cond],
                    number: conditions[cond].length
                }
            }
        }

        return mostCommon;
    }

    let recentAndCommon = {
        recent: getMostRecent(),
        common: getMostCommon()
    }

    return recentAndCommon;
}

export default function ReportConditions({ pageID, condSubmit, setCondSubmit }) {
    const [conditions, setConditions] = useState('not selected');

    const handleChange = (e) => {
        e.preventDefault();
        setConditions(e.target.value);
    }

    const handleClick = () => {
        setCondSubmit('pending');
        document.getElementById('select-conditions').setAttribute('disabled', 'disabled');
        fetch(`/api/trail-condition?localeId=${pageID}&condReport=${conditions}`,
        {
            method: 'POST'
        })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
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

    return (
        <div className="mt-4">
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