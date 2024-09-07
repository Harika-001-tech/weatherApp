import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GiSunrise,GiSunset } from 'react-icons/gi';

const WeatherPage = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=1066eee7590460f8715b44aaae4f5cd1`
      );
      setWeather(response.data);
    };
    fetchWeather();
  }, [city, units]);

  const formatBg=()=>{
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold=units==="metric"? 20:68;
    if(weather.weather[0].temp <= threshold) return "from-cyan-600 to blue-700";
    return "from-yellow-600 to-orange-700"
   }

  if (!weather) return <div>Loading...</div>;

  const sunrise=new Date(weather.sys.sunrise).toTimeString().slice(0,5);
  const sunset=new Date(weather.sys.sunset).toTimeString().slice(0,5);

  return (
    <div className='text-cyan-100 flex flex-row w-full items-center justify-center'>
      <div className={`flex flex-row w-3/4 items-center justify-center space-x-4 mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBg()}`}>
        <div>
          <h1 className="text-3xl font-semibold mb-4 text-center">{`Weather for ${weather.name}`}</h1>
          <div>
            <div className='flex flex-row items-center justify-between'>
              <p className='text-l m-1 space-x-1'>Temperature: {weather.main.temp.toFixed()}°{units === "metric" ? "C" : "F"}</p>
              <img className="size-18 h-18 m-1" src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt=""/>
            </div>

            <p className='text-l m-1 space-x-1'>Condition: {weather.weather[0].description}</p>
            <p className='text-l m-1 space-x-2'>Humidity: {weather.main.humidity}%</p>
            <p className='text-l m-1 space-x-2' >Visibility: {weather.visibility}</p>
            <p className='text-l m-1 space-x-2'>WindSpeed: {weather.wind.speed.toFixed()} {units === "metric" ? "km/h" : "mph"}</p>
            <p className='text-l m-1 space-x-2'>Atmospheric Pressure: {weather.main.pressure} hPa</p>
            <p className='text-l m-1 space-x-2'>Feels Like: {weather.main.feels_like.toFixed()}°{units === "metric" ? "C" : "F"}</p>
            <p className='text-l m-1 space-x-2'>Temp_min: {weather.main.temp_min.toFixed()}°{units === "metric" ? "C" : "F"}</p>
            <p className='text-l m-1 space-x-2'>Temp_max: {weather.main.temp_max.toFixed()}°{units === "metric" ? "C" : "F"}</p>
            
            <div className='flex flex-row items-center justify-between space-x-2'>
            <p className='text-l m-1 space-x-2'>Sunrise: {sunrise}</p>
            <GiSunrise className='size-20 h-20' size={20} />
            <p className='text-l m-1 space-x-2'>Sunrise: {sunset}</p>
            <GiSunset  className="size-20 h-20 " size={20}/>
            </div>

          </div>
        </div>

        <div className='flex flex-row w-1/4 items-center justify-center'>
          <button 
            onClick={() => setUnits("metric")}
            className={`text-xl font-medium transition ease-out hover:scale-125 ${units === "metric" ? "underline" : ""}`}
          >
            °C
          </button>
          <p className='text-2xl font-medium mx-16'>|</p>
          <button
            onClick={() => setUnits("imperial")} 
            className={`text-xl font-medium transition ease-out hover:scale-125 ${units === "imperial" ? "underline" : ""}`}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
