// import React, { useState } from "react";
// import "./AnomalyDetection.css";

// const AnomalyDetection = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [anomaly, setAnomaly] = useState("");

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simulate anomaly detection here
//     if (selectedFile) {
//       setAnomaly("Detected anomaly: Leaf disease"); // Placeholder for actual detection logic
//     } else {
//       setAnomaly("No file selected");
//     }
//   };

//   return (
//     <div>
//       <h2>Anomaly Detection</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Upload an Image:</label>
//           <input type="file" onChange={handleFileChange} />
//         </div>
//         <div>
//           <button type="submit">Detect Anomaly</button>
//         </div>
//       </form>
//       <div>
//         <h3>Predicted Anomaly:</h3>
//         <p>{anomaly || "Predicted anomaly will be displayed here."}</p>
//       </div>
//     </div>
//   );
// };

// export default AnomalyDetection;
import React, { useState } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import "./AnomalyDetection.css";

const Pest_disease = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [pestClass, setPestClass] = useState(""); // State for predicted pest class
  const [solution, setSolution] = useState(""); // State for the solution

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set the selected file from input
  };

  const handleSubmit = async (e) => {
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

        // Update state with the pest class and solution from the backend
        setPestClass(pestClass);
        setSolution(solution);
      } catch (error) {
        console.error("Error uploading the file:", error);
        setPestClass("Error detecting pest/disease. Please try again."); // Error message
        setSolution(""); // Clear previous solution on error
      }
    } else {
      setPestClass("No file selected"); // Message if no file is selected
      setSolution(""); // Clear solution if no file selected
    }
  };

  return (
    <div className="pest-disease-container">
      <h1>Pest Disease Detection</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
      {pestClass && <div className="result">Pest Class: {pestClass}</div>} {/* Display pest class result */}
      {solution && <div className="solution">Solution: {solution}</div>} {/* Display solution result */}
    </div>
  );
};

export default Pest_disease;
