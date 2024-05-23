import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('Chefchaouen');
  const [inputValue, setInputValue] = useState('');

  const apiKey = '55255b0c31b3484051a449b498d630cd';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error("Error fetching weather data: ", error);
      });
  }, [url]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(inputValue);
  };

  return (
    <div className="app">
      <div className='container'>
        <div className='top'>
          <form onSubmit={handleSearch} className='search'>
            <input
              type='text'
              placeholder='Enter city'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type='submit'>Search</button>
          </form>
          <div className='location'>
            <p>{weather.name}</p>
          </div>
          <div className='temp'>
            {weather.main ? <h1>{Math.round(weather.main.temp)}°C</h1> : null}
          </div>
          <div className='description'>
            {weather.weather ? <p>{weather.weather[0].description}</p> : null}
          </div>
        </div>
        <div className='bottom'>
          <div className='feels'>
            {weather.main ? <p>Feels like: {Math.round(weather.main.feels_like)}°C</p> : null}
          </div>
          <div className='humidity'>
            {weather.main ? <p>Humidity: {weather.main.humidity}%</p> : null}
          </div>
          <div className='wind'>
            {weather.wind ? <p>Wind: {Math.round(weather.wind.speed)} km/h</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
