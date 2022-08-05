import { useState, useEffect } from 'react';

function cleanShortForecast(sfc) {
    let regex = /(\s[A-Z])/g;
    return sfc.replaceAll(regex, (match) => {
        return match.toLowerCase();
    });
}

export default function TrailWeather({ latlong }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // format from db: 42.737915, -106.316638
        // const latlong = '42.737915, -106.316638';
        const coords = latlong.split(', ');
        // console.log(coords);
        fetch(`https://api.weather.gov/points/${coords[0]},${coords[1]}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log
            fetch(response.properties.forecast)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                // handle errors
                // check if daytime === true, then get either 0, 2, 4 or 1, 2, 4
                if (response.status && response.status == 500) {
                    console.log('Bad weather API response. Should we do something?');
                }
                let dayNightModifier = 1;
                if (!response.properties.periods[0].isDaytime) {
                    dayNightModifier = 0;
                }
                setWeather([
                    response.properties.periods[0],
                    response.properties.periods[1 + dayNightModifier],
                    response.properties.periods[3 + dayNightModifier],
                    response.properties.periods[5 + dayNightModifier],
                ]);                
            })
        });        
    }, [])

    return (
        // clean up capitalization on short forecast; improve layout styling for forecast info
        <>
            <h3>Weather Forecast</h3>
            <div className="row mt-4 mb-4">
            { weather
                ? weather.map(({ 
                    name, 
                    temperature, 
                    temperatureUnit, 
                    windSpeed, 
                    windDirection, 
                    shortForecast 
                }, index) => (
                    <div key={index} className="col-sm-3 mt-2">
                        <div className="weather-day">
                            <p>
                                <strong>{name}</strong>
                                <br />
                                <span className="fs-3">{temperature}&deg;{temperatureUnit}</span>
                                <br />
                                Wind {windSpeed} {windDirection}
                            </p>
                            <p className="small">{cleanShortForecast(shortForecast)}</p>                            
                        </div>
                    </div>    
                ))
                : [...Array(4)].map((elem, index) => (
                    <div key={index} className="col-sm-3">
                        <span className='loading-placeholder loading-text'></span>
                        <br />
                        <span className='loading-placeholder loading-md'></span>
                        <br />
                        <span className='loading-placeholder loading-text'></span>
                        <br />
                        <span className='loading-placeholder loading-text'></span>
                    </div>
                )) 
            }
            </div>
        </>
    )
}