import React, { useState } from "react";
import rabiImage1 from "./assets/Rabi_Irrigation.png";
import rabiImage2 from "./assets/rabi_process.png";
import kharifImage1 from "./assets/Kharif_weather.png";
import kharifImage2 from "./assets/kharif_process.png";
import rabiImageCrop from "./assets/Rabi_crop.png";
import kharifImageCrop from "./assets/Kharif_crop.png";
import ImageSlideshow from "./ImageSlideshow"; // Import the slideshow component

const CropRecommendation = () => {
  const [season, setSeason] = useState("Rabi");

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  const rabiImages = [rabiImageCrop, rabiImage1, rabiImage2];
  const kharifImages = [kharifImageCrop, kharifImage1, kharifImage2];

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

      {/* <p>Selected Season: {season}</p> */}
      {/* <p>Here are some recommended crops based on current conditions:</p> */}

      <div className="season-container">
        <h3>Recommended Crops</h3>
        {/* Pass the appropriate images to the slideshow based on the selected season */}
        <ImageSlideshow images={season === "Rabi" ? rabiImages : kharifImages} />
      </div>
    </div>
  );
};

export default CropRecommendation;
