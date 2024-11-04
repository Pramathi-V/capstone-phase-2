// // import React from "react";

// // const Irrigation = () => {
// //   return (
// //     <div>
// //       <h2>Irrigation</h2>
// //       {/* Add form fields or content related to irrigation */}
// //     </div>
// //   );
// // };

// // export default Irrigation;

// import "./Irrigation.css";
// import axios from "axios";

// import React, { useState, useEffect } from "react";

// const Irrigation = ({ cropType, farmArea, growthStage, standardWeek, district }) => {
//   const [date2, setDate2] = useState('');
//   const [district2, setDistrict2] = useState('');
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState('');

//     const getETPrediction = async () => {
//       setError(null); // Clear previous errors
//       try {
//           const response = await axios.post('http://localhost:5001/predict2', {
//               date: date2,
//               district: district2
//           });
//           setPrediction(response.data);
//       } catch (err) {
//           if (err.response) {
//               setError(err.response.data.error); // Capture error message from the response
//           } else {
//               setError('An unexpected error occurred.');
//           }
//       }
//   };

//   const [date, setDate] = useState("");
//   const [precipitation, setPrecipitation] = useState(0);
//   const [surfaceRunoff, setSurfaceRunoff] = useState(0);
//   const [evapotranspiration, setEvapotranspiration] = useState(0);
//   const [irrigationRequirement, setIrrigationRequirement] = useState(0);
//   const [isEditable, setIsEditable] = useState(false);

//   // Function to fetch predicted values (using placeholders for now)
//   const fetchPredictedValues = (selectedDate) => {
//     // Placeholder values - replace with actual Flask API calls
//     const predictedPrecipitation = 20; // Example value
//     const predictedSurfaceRunoff = 5; // Example value
//     const predictedEvapotranspiration = 10; // Example value

//     setPrecipitation(predictedPrecipitation);
//     setSurfaceRunoff(predictedSurfaceRunoff);
//     setEvapotranspiration(predictedEvapotranspiration);
//     calculateIrrigation(predictedPrecipitation, predictedSurfaceRunoff, predictedEvapotranspiration);
//   };

//   // Calculate irrigation requirement based on current values
//   const calculateIrrigation = (precip, runoff, evapotrans) => {
//     setIrrigationRequirement(precip - evapotrans - runoff);
//   };

//   // Trigger fetching predictions when date changes
//   useEffect(() => {
//     if (date) {
//       fetchPredictedValues(date);
//     }
//   }, [date]);

//   // Toggle edit mode
//   const toggleEdit = () => {
//     setIsEditable(!isEditable);
//   };

//   // Handle updates to values
//   const handlePrecipitationChange = (e) => setPrecipitation(Number(e.target.value));
//   const handleSurfaceRunoffChange = (e) => setSurfaceRunoff(Number(e.target.value));
//   const handleEvapotranspirationChange = (e) => setEvapotranspiration(Number(e.target.value));

//   // Recalculate irrigation requirement when any value changes
//   useEffect(() => {
//     calculateIrrigation(precipitation, surfaceRunoff, evapotranspiration);
//   }, [precipitation, surfaceRunoff, evapotranspiration]);

//   return (
//     <div className="Irrigation-container">
//       <h2>Irrigation</h2>
//       <div>
//             <h1>ET Prediction</h1>
//             <input
//                 type="date"
//                 value={date2}
//                 onChange={(e) => setDate2(e.target.value)}
//                 required
//             />
//             <input
//                 type="text"
//                 value={district2}
//                 onChange={(e) => setDistrict2(e.target.value)}
//                 placeholder="Enter District"
//                 required
//             />
//             <button onClick={getETPrediction}>Get ET Prediction</button>

//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             {prediction && (
//                 <div>
//                     <h2>Prediction for {prediction.district2} on {prediction.date2}:</h2>
//                     <p>Predicted ET: {prediction.predicted_et.toFixed(2)} mm</p>
//                     {/* Add more fields here if your model predicts additional parameters */}
//                 </div>
//             )}
//         </div> 
      
//       {/* Display selected crop and area info */}
//       <p><strong>Crop Type:</strong> {cropType}</p>
//       <p><strong>Farm Area:</strong> {farmArea}</p>
//       <p><strong>Growth Stage:</strong> {growthStage}</p>
//       <p><strong>Standard Week:</strong> {standardWeek}</p>
//       <p><strong>District:</strong> {district}</p>

//       {/* Date selection */}
//       <div>
//         <label>Date:</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>

//       {/* Precipitation, Surface Runoff, Evapotranspiration with editability */}
//       <div>
//         <label>Precipitation:</label>
//         <input
//           type="number"
//           value={precipitation}
//           onChange={handlePrecipitationChange}
//           disabled={!isEditable}
//         />
//       </div>
//       <div>
//         <label>Surface Runoff:</label>
//         <input
//           type="number"
//           value={surfaceRunoff}
//           onChange={handleSurfaceRunoffChange}
//           disabled={!isEditable}
//         />
//       </div>
//       <div>
//         <label>Evapotranspiration:</label>
//         <input
//           type="number"
//           value={evapotranspiration}
//           onChange={handleEvapotranspirationChange}
//           disabled={!isEditable}
//         />
//       </div>

//       {/* Button to enable modification */}
//       <button onClick={toggleEdit}>
//         {isEditable ? "Save" : "Modify"}
//       </button>

//       {/* Display irrigation requirement */}
//       <h3>Irrigation Requirement: {irrigationRequirement} mm</h3>
//     </div>
//   );
// };

// export default Irrigation;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const kharifIrrigationData = [
  { month: 'May', standard_week: 22, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'June', standard_week: 23, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'June', standard_week: 24, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'June', standard_week: 25, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'June', standard_week: 26, phenophase: 'Seedling (Transplanting)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'July', standard_week: 27, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'July', standard_week: 28, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'July', standard_week: 29, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'July', standard_week: 30, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'August', standard_week: 31, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'August', standard_week: 32, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'August', standard_week: 33, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'August', standard_week: 34, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: 54, stage: 'Reproductive stage' },
  { month: 'August', standard_week: 35, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: 54, stage: 'Reproductive stage' },
  { month: 'September', standard_week: 36, phenophase: 'Panicle Initiation to Booting', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'September', standard_week: 37, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'September', standard_week: 38, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'September', standard_week: 39, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Late stage' },
  { month: 'October', standard_week: 40, phenophase: 'Booting to Heading', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'October', standard_week: 41, phenophase: 'Booting to Heading', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'October', standard_week: 42, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'October', standard_week: 43, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'November', standard_week: 44, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
];
// rabi
const irrigationData = [
  { month: 'December', standard_week: 49, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'December', standard_week: 50, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'December', standard_week: 51, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'December', standard_week: 52, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'January', standard_week: 1, phenophase: 'Seedling (Transplanting)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'January', standard_week: 2, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'January', standard_week: 3, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'January', standard_week: 4, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'February', standard_week: 5, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'February', standard_week: 6, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'February', standard_week: 7, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: 54, stage: 'Reproductive stage' },
  { month: 'February', standard_week: 8, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: 54, stage: 'Reproductive stage' },
  { month: 'March', standard_week: 9, phenophase: 'Panicle Initiation to Booting', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'March', standard_week: 10, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'March', standard_week: 11, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'March', standard_week: 12, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Late stage' },
  { month: 'April', standard_week: 13, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'April', standard_week: 14, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'April', standard_week: 15, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'April', standard_week: 16, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
];


const findIdealIrrigation = (month, stage) => {
    const data = [...kharifIrrigationData, ...irrigationData]; // Combine both datasets for search
    const idealEntry = data.find(entry => entry.month === month && entry.stage === stage);
    return idealEntry ? idealEntry.irrigation : 0; // Return irrigation amount or 0 if not found
};

const Irrigation = () => {
    const [date, setDate] = useState('');
    const [district, setDistrict] = useState('');
    const [predictedValues, setPredictedValues] = useState({
        predictedRain: '',
        predictedET: '',
        predictedSR: ''
    });
    const [editable, setEditable] = useState(false);
    const [netIrrigation, setNetIrrigation] = useState(null);
    const calculateNetIrrigation = () => {
      const month = new Date(date).toLocaleString('default', { month: 'long' });
      const stage = "Specify the stage based on your logic"; // Replace with logic to determine the stage
      const idealIrrigation = findIdealIrrigation(month, stage);

      // Calculate net irrigation
      const netIrrigationValue = idealIrrigation - (predictedValues.predictedRain - predictedValues.predictedSR - predictedValues.predictedET);
      setNetIrrigation(netIrrigationValue);
  };

    const fetchPredictions = async () => {
        try {
            const precipitationResponse = await axios.post('http://localhost:5001/predict', {
                district: district,
                date: date
            });

            const evapotranspirationResponse = await axios.post('http://localhost:5002/predict', {
                district: district,
                date: date
            });

            const runoffResponse = await axios.post('http://localhost:5003/predict', {
                district: district,
                date: date
            });

            setPredictedValues({
                predictedRain: precipitationResponse.data.predicted_rain,
                predictedET: evapotranspirationResponse.data.predicted_et,
                predictedSR: runoffResponse.data.predicted_sr
            });
            // Calculate net irrigation here
            // const month = new Date(date).toLocaleString('default', { month: 'long' });
            // const stage = "Specify the stage based on your logic"; // You might want to get this value from user input or another source
            // const idealIrrigation = findIdealIrrigation(month, stage);

            // const netIrrigationValue = idealIrrigation - (precipitationResponse.data.predicted_rain - runoffResponse.data.predicted_sr - evapotranspirationResponse.data.predicted_et);
            // setNetIrrigation(netIrrigationValue);
        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };

    const handleModifyClick = () => {
        setEditable(!editable);
    };
    useEffect(() => {
      if (date && predictedValues.predictedRain !== '' && predictedValues.predictedET !== '' && predictedValues.predictedSR !== '') {
          calculateNetIrrigation();
      }
    }, [predictedValues, date]); // Depend on predictedValues and date

    useEffect(() => {
        calculateNetIrrigation(); // Calculate net irrigation on initial load
    }, [date]);

    return (
        <div>
            <h1>Irrigation Prediction</h1>
            <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
            />
            <input 
                type="text" 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)} 
                placeholder="District" 
            />
            <button onClick={fetchPredictions}>Get Predictions</button>

            <div>
                <h2>Predicted Values (in mm)</h2>
                <div>
                    <label>Predicted Rain:</label>
                    <input 
                        type="number" 
                        value={predictedValues.predictedRain} 
                        onChange={(e) => setPredictedValues({ ...predictedValues, predictedRain: e.target.value })} 
                        disabled={!editable} 
                    />
                </div>
                <div>
                    <label>Predicted Evapotranspiration:</label>
                    <input 
                        type="number" 
                        value={predictedValues.predictedET} 
                        onChange={(e) => setPredictedValues({ ...predictedValues, predictedET: e.target.value })} 
                        disabled={!editable} 
                    />
                </div>
                <div>
                    <label>Predicted Surface Runoff:</label>
                    <input 
                        type="number" 
                        value={predictedValues.predictedSR} 
                        onChange={(e) => setPredictedValues({ ...predictedValues, predictedSR: e.target.value })} 
                        disabled={!editable} 
                    />
                </div>
                <button onClick={handleModifyClick}>
                    {editable ? 'Lock Values' : 'Modify Values'}
                </button>
            </div>
            {netIrrigation !== null && (
                <div>
                    <h2>Net Irrigation</h2>
                    <p>{netIrrigation} mm</p>
                </div>
            )}
        </div>
    );
};

export default Irrigation;
