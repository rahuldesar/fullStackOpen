import axios from 'axios';
import { useEffect, useState } from 'react';

const WeatherStackAPI = ({country}) => {


const [weatherData, setWeatherData] = useState([]);
console.log("weatherData" , weatherData);
let effectWeather = () => {
  let APIkey = process.env.REACT_APP_WEATHER_API;
  let [lat,lon] = country.capitalInfo.latlng;
  // console.log(lat, lon);
  // console.log(url);

  let url = `http://api.weatherstack.com/current?access_key=${APIkey}&query=${lat},${lon}`;
  axios.get(url)
  .then(response => {
    setWeatherData(response.data);
  })
  }

  useEffect(effectWeather, [] );


  console.log("COUNTRY ", country);
  // console.log("API DATA ", weatherData.current.temperature);
  
  if(weatherData.length === 0 ){
    return(
      <>
      MISSING DATA
      </>
    )
  }
  else {
  
  return(
    <div> 
      <p>temperature : {weatherData.current.temperature}</p>
      <img src={weatherData.current.weather_icons[0]} alt="" />
      <p>observation time : {weatherData.current.observation_time}</p>

    </div>
  )}
}

export default WeatherStackAPI;