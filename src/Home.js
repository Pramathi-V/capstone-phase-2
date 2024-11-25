import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";

// Function to import district images dynamically
const importDistrictImages = () => {
  const images = {};
  const context = require.context(
    "./District_Map",
    false,
    /\.(png|jpe?g|svg)$/ // Match image file extensions
  );

  context.keys().forEach((item) => {
    const imageName = item.replace("./", "");
    const imageKey = imageName.split(".")[0].replace(/ /g, "_"); // Replace spaces with underscores
    images[imageKey] = context(item); // Map the sanitized image name to its file path
  });

  return images;
};

const districtImages = importDistrictImages();

const Home = () => {
  const navigate = useNavigate();
  const {
    cropType,
    setCropType,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    district,
    setDistrict,
    districtImage,
    setDistrictImage,
    farmArea,
    setFarmArea,
    growthStage,
    setGrowthStage,
    predictionDate,
    setPredictionDate,
  } = useContext(DataContext);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (!predictionDate) setPredictionDate(getTodayDate());

  const DISTRCT_URL = "http://localhost:5006";
  const WEATHER_URL = "http://localhost:5009";

  const handleDistrictSubmit = async (e) => {
    e.preventDefault();
    await fetchDistrict(latitude, longitude);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please check location settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const fetchDistrict = async (lat, lon) => {
    try {
      const response = await axios.post(`${DISTRCT_URL}/find_district`, {
        latitude: lat,
        longitude: lon,
      });
      const districtName = response.data.district;
      setDistrict(districtName);

      if (districtName === "Out of Telangana") {
        setDistrictImage("");
        return;
      }

      const imageKey = districtName.replace(/ /g, "_");
      setDistrictImage(districtImages[imageKey] || "");
    } catch (error) {
      console.error("Error fetching district:", error);
      setDistrict("Unable to retrieve district");
      setDistrictImage("");
    }
  };

  const fetchWeather = async () => {
    if (!latitude || !longitude) {
      alert("Please enter latitude and longitude first!");
      return;
    }

    const roundedLat = latitude;
    const roundedLon = longitude;

    try {
      const response = await axios.get(`${WEATHER_URL}/fetch_weather`, {
        params: { lat: roundedLat, lon: roundedLon },
      });

      const weatherData = response.data;
      setWeatherData(weatherData); // Update weather data state
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data.");
    }
  };

  // State to store the fetched weather data
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="container">
      {/* Main Form starts here */}
      <form onSubmit={handleDistrictSubmit}>
        <div>
          <label>Crop Type:</label>
          <select
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
          >
            <option value="Rice-Kharif">Rice-Kharif</option>
            <option value="Rice-Rabi">Rice-Rabi</option>
          </select>
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
          />
          <div style={{ marginTop: "10px" }}>
            <button type="button" onClick={useCurrentLocation}>
              Use Current Location
            </button>
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleDistrictSubmit}>Fetch District</button>
        </div>

        {district && (
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <label>District:</label>
            <p>{district}</p>
          </div>
        )}
        {districtImage && (
          <div>
            <img
              src={districtImage}
              alt={district}
              style={{ width: "300px", height: "auto" }}
            />
          </div>
        )}

        <div style={{ marginTop: "10px" }}>
          <button type="button" onClick={fetchWeather}>
            Fetch Weather
          </button>
        </div>

        {weatherData && (
          <div style={{ textAlign: "center" }}>
            <label>Weather Details:</label>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Feels Like: {weatherData.feels_like}°C</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Description: {weatherData.weather}</p>
            <p>Wind Speed: {weatherData.windspeed}m/s</p>
          </div>
        )}

        <div>
          <label>Farm Area (in Hectares):</label>
          <input
            type="text"
            value={farmArea}
            onChange={(e) => setFarmArea(e.target.value)}
            placeholder="Enter farm area"
          />
        </div>

        <div>
          <label>Growth Stage:</label>
          <select
            value={growthStage}
            onChange={(e) => setGrowthStage(e.target.value)}
          >
            <option value="Nursery">Nursery</option>
            <option value="Transplanting">Transplanting</option>
            <option value="Tilling">Tilling</option>
            <option value="Panical">Panical initiation</option>
            <option value="Heading">Booting to heading</option>
            <option value="Mature">Mature</option>
          </select>
        </div>

        <div>
          <label>Prediction Date:</label>
          <input
            type="date"
            value={predictionDate}
            onChange={(e) => setPredictionDate(e.target.value)}
          />
        </div>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => navigate("/crop-data")}>
          Maximum Crop Yield
        </button>
        <button onClick={() => navigate("/irrigation")}>Irrigation</button>
        <button onClick={() => navigate("/crop-growth-cycle")}>
          Preventative Methods
        </button>
        <button onClick={() => navigate("/anomaly-detection")}>
          Anomaly Detection
        </button>
      </div>
    </div>
  );
};

export default Home;
