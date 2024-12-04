import React, {useState, useCallback, useEffect, useRef, useMemo} from 'react'
import Card from './components/Card';

const App = () => {
  const [city, setCity] = useState("Asansol");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const inputRef = useRef(null)

  const apiUrl = useMemo(()=>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_OWN_API_KEY_FROM_OPENWEATHERMAP`,
  [city]
  )

  const fetchWeatherData = useCallback(async()=>{
    setLoading(true);
    setError(null);
    try{
      const response = await fetch(apiUrl);
      if(!response.ok){
        throw new Error("Failed to fetch weather data")
      }
      const data = await response.json();
      setWeatherData(data);
    } catch ( err ){
      setError(err.message);
    }  finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(()=>{
    fetchWeatherData();
  }, [fetchWeatherData]);

  const handleCityChange = () => {
    if(inputRef.current){
      setCity(inputRef.current.value);
    }
  }  

  return (
    <div>
      <h1>Weather App</h1>
      <div>
        <input ref={inputRef} type="text" placeholder='Enter your City' defaultValue={city}/>
        <button onClick={handleCityChange}>Get Weather</button>
      </div>
      {loading && <p>Loading........</p>}
      {error && <p>{error}</p>}
      {weatherData && !loading && !error && (
        <Card temp={weatherData.main.temp} weather={weatherData.weather[0].main}/>
      )}
    </div>
  )
}

export default App
