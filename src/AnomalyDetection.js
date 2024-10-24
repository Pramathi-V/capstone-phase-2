import React, { useState } from "react";
import "./AnomalyDetection.css";

const AnomalyDetection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [anomaly, setAnomaly] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate anomaly detection here
    if (selectedFile) {
      setAnomaly("Detected anomaly: Leaf disease"); // Placeholder for actual detection logic
    } else {
      setAnomaly("No file selected");
    }
  };

  return (
    <div>
      <h2>Anomaly Detection</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload an Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <button type="submit">Detect Anomaly</button>
        </div>
      </form>
      <div>
        <h3>Predicted Anomaly:</h3>
        <p>{anomaly || "Predicted anomaly will be displayed here."}</p>
      </div>
    </div>
  );
};

export default AnomalyDetection;
