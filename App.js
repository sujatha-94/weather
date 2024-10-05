
import React from "react";
import WeatherWidget from "./Weather/WeatherWidget"; // Correctly import the WeatherWidget component


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1></h1>
      </header>
      <main>
        <WeatherWidget /> {/* Render the WeatherWidget component */}
      </main>
    </div>
  );
}

export default App;

