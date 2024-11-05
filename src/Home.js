import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

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
  const [cropType, setCropType] = useState("Rice-Kharif");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [district, setDistrict] = useState("");
  const [districtImage, setDistrictImage] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [cropSelected, setCropSelected] = useState("Yes");
  const [predictionDate, setPredictionDate] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
  const [growthStage, setGrowthStage] = useState("");
  const [irrigationType, setIrrigationType] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const DISTRCT_URL = "http://localhost:5006"; // Main server URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${DISTRCT_URL}/predict`, {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        date: predictionDate,
      });
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Unable to fetch prediction. Please try again.");
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);
          await fetchDistrict(lat, lon);
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
      if (districtImages[imageKey]) {
        setDistrictImage(districtImages[imageKey]);
      } else {
        setDistrictImage("");
      }
    } catch (error) {
      console.error("Error fetching district:", error);
      setDistrict("Unable to retrieve district");
      setDistrictImage("");
    }
  };

  const handleLatitudeChange = (e) => {
    const lat = e.target.value;
    setLatitude(lat);
    fetchDistrict(lat, longitude);
  };

  const handleLongitudeChange = (e) => {
    const lon = e.target.value;
    setLongitude(lon);
    fetchDistrict(latitude, lon);
  };

  return (
    <div>
      {/* Main Form Section */}
      <form onSubmit={handleSubmit}>
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
            onChange={handleLatitudeChange}
            placeholder="Enter latitude"
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            value={longitude}
            onChange={handleLongitudeChange}
            placeholder="Enter longitude"
          />
          <div>
            <button type="button" onClick={useCurrentLocation}>
              Use Current Location
            </button>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <label>District:</label>
          <p>{district || "District will be fetched automatically"}</p>
        </div>

        {districtImage && (
          <div>
            <img
              src={districtImage}
              alt={district}
              style={{ width: "300px", height: "auto" }}
            />
            <p>{district}</p>
          </div>
        )}
        <div>
          <label>Farm Area (in acres):</label>
          <input
            type="text"
            value={farmArea}
            onChange={(e) => setFarmArea(e.target.value)}
            placeholder="Enter farm area"
          />
        </div>
        <div>
          <label>Do you have a crop selected?</label>
          <select
            value={cropSelected}
            onChange={(e) => setCropSelected(e.target.value)}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Growth Stage:</label>
          <select
            value={growthStage}
            onChange={(e) => setGrowthStage(e.target.value)}
          >
            <option value="Nursery">Nursery</option>
            <option value="Transplanting">Transplanting</option>
            <option value="Flowering">Flowering</option>
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
        <button type="submit">Get Prediction</button>
      </form>

      {predictionResult && (
        <div>
          <h3>Prediction Results:</h3>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </div>
      )}

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
