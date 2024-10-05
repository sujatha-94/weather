import React, { useState, useEffect } from "react";
import axios from "axios";
import MiniCard from "./MiniCard"; // Import the MiniCard component
import "./weatherapi.css"; // Import the CSS file
import londonImage from '../assets/image1.png';
import parisImage from '../assets/image2.png';
import NewYorkImage from '../assets/image3.png';
import TokyoImage from '../assets/image4.png';
import MumbaiImage from '../assets/image5.png';
import HyderabadImage from '../assets/image5.png';
import VijayawadaImage from '../assets/image7.png';
import KolkataImage from '../assets/image8.png';
import KakindaImage from '../assets/image9.png'; 
import NelloreImage from '../assets/image10.png';
import TirupatiImage from '../assets/image11.png';
import LucknowImage from '../assets/image12.png';
import JaipurImage from '../assets/image13.png';

const API_KEY = "e70ea3a90a9ed9f89278ba4d92a49178"; // Replace with your OpenWeatherMap API key
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

// City-specific background images
const cityBackgrounds = {
  London: `url(${londonImage})`,
  Paris: `url(${parisImage})`,
  NewYork: `url(${NewYorkImage})`,
  Tokyo: `url(${TokyoImage})`,
  Mumbai: `url(${MumbaiImage})`,
  Hyderabad:`url(${HyderabadImage})`,
  Vijayawada:`url(${VijayawadaImage})`,
  Kolkata:`url(${KolkataImage})`,
  Kakinda:`url(${KakindaImage})`, 
  Nellore:`url(${NelloreImage})`,
  Tirupati:`url(${TirupatiImage})`,
  Lucknow:`url(${LucknowImage})`,
  Jaipur:`url(${JaipurImage})`,
};

function WeatherWidget() {
  const [city, setCity] = useState(""); // Default city
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_BASE_URL, {
          params: {
            q: city,
            units: "metric",
            appid: API_KEY,
          },
        });
        const dailyData = response.data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        ).slice(0, 7); // Get only the next 7 days
        setWeather(dailyData);
      } catch (err) {
        setError("City not found."); // Show error message
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const getWeekday = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const formattedDateTime = currentDateTime.toLocaleString();

  // Determine the background image for the city, fallback to a default image
  const backgroundImage = cityBackgrounds[city] || "url('../assets/defaultImage.png')";

  return (
    <div
      className="weather-widget-container"
      style={{ backgroundImage: backgroundImage, backgroundSize: 'cover' }}
    >
      <div className="weather-widget">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
            required // Prevent submission of empty city
          />
        </form>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        <div className="current-date-time">{formattedDateTime}</div>

        {weather.length > 0 && (
          <div className="weather-info">
            <p>{weather[0].weather[0].description}</p>
            <p>Temperature: {weather[0].main.temp}°C</p>
            <p>Wind Speed: {weather[0].wind.speed} m/s</p>
            <p>Humidity: {weather[0].main.humidity}%</p>
            <img
              src={`https://openweathermap.org/img/w/${weather[0].weather[0].icon}.png`}
              alt="Weather icon"
            />
          </div>
        )}
      </div>

      {/* Display 7 weekdays using MiniCard */}
      {weather.length > 0 && (
        <div className="weekdays-container">
          {weather.map((day, index) => (
            <MiniCard 
              key={index} 
              day={day} 
              weekday={getWeekday(day.dt)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
