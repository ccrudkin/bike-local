import { useState, useEffect } from 'react';

function cleanShortForecast(sfc) {
  let regex = /(\s[A-Z])/g;
  return sfc.replaceAll(regex, (match) => {
    return match.toLowerCase();
  });
}

function fetchWeather(latlong, setWeather, retries) {
  // format from db: '42.737915, -106.316638'
  const coords = latlong.split(', ');

  fetch(`https://api.weather.gov/points/${coords[0]},${coords[1]}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log
      fetch(response.properties.forecast)
        .then((response) => {
          if (!response.ok) {
            // handle errors in catch
            throw new Error(`Fetch error. Response: ${response.status}`);
          }
          return response.json();
        })
        .then((response) => {
          // check if daytime === true, then get either 0, 1, 3, 5 or 0, 2, 4, 6 
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
        .catch((error) => {
          console.error('There was a an error fetching weather.', error);
          if (retries > 0) {
            setTimeout(() => {
              console.log(`Retrying weather... (Retries left: ${retries})`);
              return fetchWeather(latlong, setWeather, retries - 1);
            }, 4000);
          } else {
            setWeather(['error', 'Could not fetch current weather.']);
          }
        });
    });
}

export default function TrailWeather({ latlong }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // variable[2] is number of retries allowed
    fetchWeather(latlong, setWeather, 2);
  }, [])

  const handleClick = () => {
    setWeather(null);
    fetchWeather(latlong, setWeather, 2);
  }

  return (
    <>
      <h3 className='weather-title'>Weather Forecast</h3>
      <div className="weather-container">
        {weather && weather.length === 4
          ? weather.map(({
            name,
            temperature,
            temperatureUnit,
            windSpeed,
            windDirection,
            shortForecast
          }, index) => (
            <div key={index} className="weather-day-container">
              <div className="weather-day">
                <p>
                  <span className='weather-day-name'>{name}</span>
                  <br />
                  <span className="weather-day-temp">{temperature}&deg;{temperatureUnit}</span>
                  <br />
                  Wind {windSpeed} {windDirection}
                </p>
                <p className="small">{cleanShortForecast(shortForecast)}</p>
              </div>
            </div>
          ))
          : weather && weather[0] === 'error'
            ? <div className="mt-4 mb-5">
              <p><i className="fa-solid fa-circle-exclamation"></i> Could not get current weather forecast. Please try again.</p>
              <div className="mt-2 mb-2">
                <button className="btn btn-warning" onClick={handleClick}>Retry</button>
              </div>
            </div>
            : [...Array(4)].map((elem, index) => (
              <div key={index} className="weather-day-container">
                <div className="weather-day">
                  <span className='loading-placeholder loading-text'></span>
                  <br />
                  <span className='loading-placeholder loading-md'></span>
                  <br />
                  <span className='loading-placeholder loading-md'></span>
                  <br />
                  <br />
                  <span className='loading-placeholder loading-text'></span>
                  <br />
                  <span className='loading-placeholder loading-text'></span>
                </div>
              </div>
            ))
        }
      </div>
    </>
  )
}