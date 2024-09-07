import axios from 'axios';

const CITY_API_URL = "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/forecast/daily";
const API_KEY = "1066eee7590460f8715b44aaae4f5cd1";

export const fetchCities = async (limit = 20) => {
  const response = await axios.get(`${CITY_API_URL}?limit=${limit}`);
  return response.data.records;
  console.log(data)
};

export const fetchWeather = async (cityName, cnt = 7) => {
  const response = await axios.get(`${WEATHER_API_URL}?q=${cityName}&cnt=${cnt}&appid=${API_KEY}`);
  return response.data;
};
