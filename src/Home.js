import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [cropType, setCropType] = useState("");
  const [location, setLocation] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [cropSelected, setCropSelected] = useState("Yes");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ cropType, location, farmArea, cropSelected });
  };

  const useCurrentLocation = () => {
    setLocation("Current Location"); // Logic for location fetching can go here
  };

  return (
    <div>
      <h2>Home</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Crop Type:</label>
          <input
            type="text"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            placeholder="Enter crop type"
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
