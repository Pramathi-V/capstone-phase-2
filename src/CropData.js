import React, { useState, useContext } from "react";
import axios from "axios";
import "./CropData.css";
import { DataContext } from "./DataContext";

function CropData() {
  const { district, setDistrict } = useContext(DataContext); // Get district from context
  const [date, setDate] = useState("");
  const [cropType, setCropType] = useState("rice");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [showDistrictImage, setShowDistrictImage] = useState(false);

  // Helper function to determine the season based on the month
  const getSeason = (month) => {
    if (month >= 5 && month <= 11) {
      return "Kharif"; // May to November
    } else {
      return "Rabi"; // December to April
    }
  };

  const handlePredict = async () => {
    setError("");
    setPrediction(null);
    setShowDistrictImage(false);

    try {
      const response = await axios.post("http://localhost:5000/predict_yield", {
        district: district,
        date: date,
      });

      setPrediction(response.data);
      setShowDistrictImage(true);
    } catch (err) {
      setError(
        "Error fetching prediction. Please check the district and date."
      );
    }
  };

  // Determine the season based on the input date
  const month = new Date(date).getMonth() + 1;
  const season = getSeason(month);

  // Function to get the image path for the selected district
  const getDistrictImage = (districtName) => {
    try {
      return require(`./District_Map/${districtName}.png`);
    } catch (err) {
      return null; // Return null if the image is not found
    }
  };

  const districtImage = getDistrictImage(district);

  return (
    <div className="CropData">
      {/* <div className="image-container">
        <img
          src={require("./paddy-fields-1024x636.jpg")}
          alt="Paddy Fields"
          className="paddy-image"
        />
      </div> */}
      <div className="container">
        <input
          type="text"
          placeholder="Enter District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          value={cropType}
          readOnly
          className="crop-type-input"
        />
        <button onClick={handlePredict}>Predict Yield</button>
      </div>

      {error && <p className="error">{error}</p>}

      {prediction && (
        <div className="container">
        <div className="results">
          <h2>Prediction Results:</h2>
          {season === "Kharif" ? (
            <>
              <p>
                Predicted Kharif Yield:{" "}
                {prediction.Predicted_Kharif_Yield.toFixed(2)} (Tonne/Hectare)
              </p>
              <p>
                Adjusted Kharif Yield:{" "}
                {prediction.Adjusted_Kharif_Yield.toFixed(2)} (Tonne/Hectare)
              </p>
            </>
          ) : (
            <>
              <p>
                Predicted Rabi Yield:{" "}
                {prediction.Predicted_Rabi_Yield.toFixed(2)} (Tonne/Hectare)
              </p>
              <p>
                Adjusted Rabi Yield: {prediction.Adjusted_Rabi_Yield.toFixed(2)}{" "}
                (Tonne/Hectare)
              </p>
            </>
          )}

          {showDistrictImage && districtImage && (
            <div className="image-container">
              <img
                src={districtImage}
                alt={`${district} Map`}
                className="district-image"
              />
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
}

export default CropData;
