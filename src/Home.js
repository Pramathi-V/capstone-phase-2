import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { DataContext } from "./DataContext"; // Import the context

// Import all images from the District_Map folder
const importDistrictImages = () => {
  const images = {};
  const context = require.context(
    "./District_Map",
    false,
    /\.(png|jpe?g|svg)$/
  );
  context.keys().forEach((item) => {
    const imageName = item.replace("./", "");
    images[imageName.split(".")[0]] = context(item);
  });
  return images;
};

const districtImages = importDistrictImages();

const Home = () => {
  const navigate = useNavigate();

  // Access context values and setters
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

  // Set today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Ensure predictionDate is initialized
  if (!predictionDate) setPredictionDate(getTodayDate());

  const DISTRCT_URL = "http://localhost:5006"; // Main server URL

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

  return (
    <div className="container">
      {/* Main Form Section */}
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
          <div>
            <button type="button" onClick={useCurrentLocation}>
              Use Current Location
            </button>
          </div>
        </div>

        {/* New Submit button for fetching district */}
        <div style={{ marginTop: "10px" }}>
          <button onClick={handleDistrictSubmit}>Fetch District</button>
        </div>

        {/* Display district and image only after clicking 'Fetch District' */}
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
            <option value="Panical">Panical intiation</option>
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

      {/* Navigation Buttons */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={() => navigate("/crop-data")}>
          Maximum Crop Yield
        </button>
        <button onClick={() => navigate("/irrigation")}>Irrigation</button>
        <button onClick={() => navigate("/crop-growth-cycle")}>
          Preventative methods
        </button>
        <button onClick={() => navigate("/anomaly-detection")}>
          Anomaly Detection
        </button>
      </div>
    </div>
  );
};

export default Home;
