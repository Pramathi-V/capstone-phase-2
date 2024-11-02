// import React from "react";

// const Irrigation = () => {
//   return (
//     <div>
//       <h2>Irrigation</h2>
//       {/* Add form fields or content related to irrigation */}
//     </div>
//   );
// };

// export default Irrigation;

import "./Irrigation.css";

import React, { useState, useEffect } from "react";

const Irrigation = ({ cropType, farmArea, growthStage, standardWeek, district }) => {
  const [date, setDate] = useState("");
  const [precipitation, setPrecipitation] = useState(0);
  const [surfaceRunoff, setSurfaceRunoff] = useState(0);
  const [evapotranspiration, setEvapotranspiration] = useState(0);
  const [irrigationRequirement, setIrrigationRequirement] = useState(0);
  const [isEditable, setIsEditable] = useState(false);

  // Function to fetch predicted values (using placeholders for now)
  const fetchPredictedValues = (selectedDate) => {
    // Placeholder values - replace with actual Flask API calls
    const predictedPrecipitation = 20; // Example value
    const predictedSurfaceRunoff = 5; // Example value
    const predictedEvapotranspiration = 10; // Example value

    setPrecipitation(predictedPrecipitation);
    setSurfaceRunoff(predictedSurfaceRunoff);
    setEvapotranspiration(predictedEvapotranspiration);
    calculateIrrigation(predictedPrecipitation, predictedSurfaceRunoff, predictedEvapotranspiration);
  };

  // Calculate irrigation requirement based on current values
  const calculateIrrigation = (precip, runoff, evapotrans) => {
    setIrrigationRequirement(precip - evapotrans - runoff);
  };

  // Trigger fetching predictions when date changes
  useEffect(() => {
    if (date) {
      fetchPredictedValues(date);
    }
  }, [date]);

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  // Handle updates to values
  const handlePrecipitationChange = (e) => setPrecipitation(Number(e.target.value));
  const handleSurfaceRunoffChange = (e) => setSurfaceRunoff(Number(e.target.value));
  const handleEvapotranspirationChange = (e) => setEvapotranspiration(Number(e.target.value));

  // Recalculate irrigation requirement when any value changes
  useEffect(() => {
    calculateIrrigation(precipitation, surfaceRunoff, evapotranspiration);
  }, [precipitation, surfaceRunoff, evapotranspiration]);

  return (
    <div className="Irrigation-container">
      <h2>Irrigation</h2>
      
      {/* Display selected crop and area info */}
      <p><strong>Crop Type:</strong> {cropType}</p>
      <p><strong>Farm Area:</strong> {farmArea}</p>
      <p><strong>Growth Stage:</strong> {growthStage}</p>
      <p><strong>Standard Week:</strong> {standardWeek}</p>
      <p><strong>District:</strong> {district}</p>

      {/* Date selection */}
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Precipitation, Surface Runoff, Evapotranspiration with editability */}
      <div>
        <label>Precipitation:</label>
        <input
          type="number"
          value={precipitation}
          onChange={handlePrecipitationChange}
          disabled={!isEditable}
        />
      </div>
      <div>
        <label>Surface Runoff:</label>
        <input
          type="number"
          value={surfaceRunoff}
          onChange={handleSurfaceRunoffChange}
          disabled={!isEditable}
        />
      </div>
      <div>
        <label>Evapotranspiration:</label>
        <input
          type="number"
          value={evapotranspiration}
          onChange={handleEvapotranspirationChange}
          disabled={!isEditable}
        />
      </div>

      {/* Button to enable modification */}
      <button onClick={toggleEdit}>
        {isEditable ? "Save" : "Modify"}
      </button>

      {/* Display irrigation requirement */}
      <h3>Irrigation Requirement: {irrigationRequirement} mm</h3>
    </div>
  );
};

export default Irrigation;
