import React, { useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import "./AnomalyDetection.css";

const Pest_disease = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [pestClass, setPestClass] = useState(""); // State for predicted pest class
  const [solution, setSolution] = useState(""); // State for the solution
  const [Disease,setDisease] = useState("");
  const [Dsol,setSol] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set the selected file from input
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent default form submission

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile); // Append the selected file to FormData

      try {
        // Send POST request to Flask backend
        const response = await axios.post("http://localhost:5010/Pest_disease", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Assuming your response structure includes these properties
        const pestClass = response.data.pest; // Access pest class from response
        const solution = response.data.solution; // Access solution from response
        const disease = response.data.Disease;
        const sol = response.data.Dsol;

        // Update state with the pest class and solution from the backend
        setPestClass(pestClass);
        setSolution(solution);
        setDisease(disease);
        setSol(sol);
      } catch (error) {
        console.error("Error uploading the file:", error);
        setPestClass("Error detecting pest/disease. Please try again."); // Error message
        setSolution(""); // Clear previous solution on error
      }
      finally{
        setLoading(false);
      }
    } else {
      setPestClass("No file selected"); // Message if no file is selected
      setSolution(""); // Clear solution if no file selected
    }
  };

  return (
    <div className="pest-disease-container">
      <h1>Pest & Disease Detection</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading........</p>}
      {pestClass && <div className="result">Pest Class: {pestClass}</div>} {/* Display pest class result */}
      {solution && <div className="solution">Solution: {solution}</div>} {/* Display solution result */}
      {Disease && <div className="disease">Disease: {Disease}</div>} {/* Display solution result */}
      {Dsol && <div className="dsol">Solution to disease: {Dsol}</div>} {/* Display solution result */}
    </div>
  );
};

export default Pest_disease;
