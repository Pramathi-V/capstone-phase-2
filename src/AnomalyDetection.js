import React, { useState } from "react";
import axios from "axios"; 
import "./AnomalyDetection.css";

const Pest_disease = () => {
  const [selectedFile, setSelectedFile] = useState(null); 
  const [pestClass, setPestClass] = useState(""); 
  const [solution, setSolution] = useState(""); 
  const [Disease, setDisease] = useState("");
  const [Dsol, setSol] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:5010/Pest_disease",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        
        const pestClass = response.data.pest; 
        const solution = response.data.solution; 
        const disease = response.data.Disease;
        const sol = response.data.Dsol;

        
        setPestClass(pestClass);
        setSolution(solution);
        setDisease(disease);
        setSol(sol);
      } catch (error) {
        console.error("Error uploading the file:", error);
        setPestClass("Error detecting pest/disease. Please try again."); 
        setSolution("");
      } finally {
        setLoading(false);
      }
    } else {
      setPestClass("No file selected"); 
      setSolution(""); 
    }
  };

  return (
    <div className="container">
      <h2>Crop Growth Cycle (Preventative methods)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading........</p>}
      {pestClass && <div className="result">Pest Class: {pestClass}</div>}{" "}
      {solution && <div className="solution">Solution: {solution}</div>}{" "}
      {Disease && <div className="disease">Disease: {Disease}</div>}{" "}
      {Dsol && <div className="dsol">Solution to disease: {Dsol}</div>}{" "}
    </div>
  );
};

export default Pest_disease;
