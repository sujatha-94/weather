// MiniCard.jsx
import React from "react";
import PropTypes from "prop-types";
import "./MiniCard.css"; // Optional: Create a CSS file for styling

const MiniCard = ({ day, weekday }) => {
  return (
    <div className="mini-card">
      <h3>{weekday}</h3>
      <p>{day.weather[0].description}</p>
      <p>Temp: {day.main.temp}°C</p>
      <img
        src={`https://openweathermap.org/img/w/${day.weather[0].icon}.png`}
        alt="Weather icon"
      />
    </div>
  );
};

MiniCard.propTypes = {
  day: PropTypes.object.isRequired,
  weekday: PropTypes.string.isRequired,
};

export default MiniCard;

