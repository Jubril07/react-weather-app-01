import { useState } from "react";
import "./App.css";
import Forecast from "./Components/Forcast/Forecast";
import CurrentWeather from "./Components/Search/Current-weather/Current-weather";
import Search from "./Components/Search/Search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    // console.log(searchData)
    const api_key = "ca55a27e3fec5567dd7acf4662a638ce";
    const currentWeatherFetch = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    );
    const forecastFetch = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        // console.log(`From app js ${response}`)
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
    // console.log(lon,lat)
    // console.log(currentWeatherFetch);
  };
  // console.log(currentWeather)
  // console.log(forecast)
  return (
    <div className="container">
      <h1>WApp</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {/* <Forecast data={forecast}/> */}
    </div>
  );
}

export default App;
