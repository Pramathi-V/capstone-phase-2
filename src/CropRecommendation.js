import React, { useState } from "react";
import growthSatge from "./assets/growth_stages.png";
import rabiImage1 from "./assets/Rabi_Irrigation.png"; // Adjust the path to your Rabi image
import rabiImage2 from "./assets/rabi_process.png"; // Adjust the path to your Rabi image
import kharifImage2 from "./assets/kharif_process.png"; // Adjust the path to your Kharif image
import kharifImage1 from "./assets/Kharif_weather.png"; // Adjust the path to your Kharif image
import rabiImageCrop from "./assets/Rabi_crop.png"; // Adjust the path to your Rabi image
import kharifImageCrop from "./assets/Kharif_crop.png";

const CropRecommendation = () => {
  const [season, setSeason] = useState("Rabi"); // State to store the selected season

  const handleSeasonChange = (event) => {
    setSeason(event.target.value); // Update the state when the dropdown changes
  };

  // Conditional rendering of images based on selected season
  const renderImages = () => {
    if (season === "Rabi") {
      return (
        <>
          <img
            src={rabiImageCrop}
            alt="Rabi Crop Details"
            style={{ width: "500px", margin: "10px" }}
          />
          {/* <img src={growthSatge} alt="growth stages" style={{ width: '500px', margin: '10px' }} /> */}
          <br></br>
          <h4>Crop Weather Calander</h4>
          <img
            src={rabiImage1}
            alt="Rabi Crop 1"
            style={{ height: "500px", margin: "10px" }}
          />
          <img
            src={rabiImage2}
            alt="Rabi Crop 2"
            style={{ height: "500px", margin: "10px" }}
          />
        </>
      );
    } else if (season === "Kharif") {
      return (
        <>
          <img
            src={kharifImageCrop}
            alt="Kharif Crop Details"
            style={{ width: "500px", margin: "10px" }}
          />
          <br></br>
          <h4>Crop Weather Calander</h4>
          <img
            src={kharifImage1}
            alt="Kharif Crop 1"
            style={{ height: "500px", margin: "10px" }}
          />
          <img
            src={kharifImage2}
            alt="Kharif Crop 2"
            style={{ height: "500px", margin: "10px" }}
          />
        </>
      );
    }
  };

  return (
    <div className="container">
      <h2>Crop Recommendation</h2>
      <label htmlFor="season-select">Select Season:</label>
      <select
        id="season-select"
        value={season}
        onChange={handleSeasonChange}
        style={{ margin: "10px 0", padding: "5px" }}
      >
        <option value="Rabi">Rabi</option>
        <option value="Kharif">Kharif</option>
      </select>

      <p>Selected Season: {season}</p>
      <p>Here are some recommended crops based on current conditions:</p>
      <div className="season-container">
        <h3>Recommended Crops</h3>
        {renderImages()}
      </div>
    </div>
  );
};

export default CropRecommendation;
