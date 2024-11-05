import React, { useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [cropType, setCropType] = useState("Rice-Kharif");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [cropSelected, setCropSelected] = useState("Yes");
  const [predictionDate, setPredictionDate] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
  const [growthStage, setGrowthStage] = useState("");
  const [irrigationType, setIrrigationType] = useState("");

  // new
  const [date, setDate] = useState("");
  const [district, setDistrict] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const getWeatherPrediction = async () => {
    setError(null); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:5001/predict", {
        date: date,
        district: district,
      });
      setPrediction(response.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error); // Capture error message from the response
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  // new

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", {
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

  return (
    <div>
      <h2>Home</h2>
      {/* new */}
      <div>
        <h1>Weather Prediction</h1>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          placeholder="Enter District"
          required
        />
        <button onClick={getWeatherPrediction}>Get Weather Prediction</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {prediction && (
          <div>
            <h2>
              Prediction for {prediction.district} on {prediction.date}:
            </h2>
            <p>Predicted Rain: {prediction.predicted_rain.toFixed(2)} mm</p>
            {/* Add more fields here if your model predicts additional parameters */}
          </div>
        )}
      </div>
      {/* new */}
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
          <button type="button" onClick={useCurrentLocation}>
            Use Current Location
          </button>
        </div>

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
          <label>Irrigation Type: </label>
          <select
            value={irrigationType}
            onChange={(e) => setIrrigationType(e.target.value)}
          >
            <option value="Submersion">Submersion</option>
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
        <button type="submit">Get Irrigation</button>
      </form>

      {predictionResult && (
        <div>
          <h3>Prediction Results:</h3>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
