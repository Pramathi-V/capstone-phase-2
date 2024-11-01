// import React, { useState } from "react";
// import "./Home.css";

// const Home = () => {
//   const [cropType, setCropType] = useState("");
//   const [location, setLocation] = useState("");
//   const [farmArea, setFarmArea] = useState("");
//   const [cropSelected, setCropSelected] = useState("Yes");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ cropType, location, farmArea, cropSelected });
//   };

//   const useCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
//           // Optionally, call a reverse geocoding service here to convert coordinates to a readable address
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           alert("Unable to fetch location. Please check location settings.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   };

//   return (
//     <div>
//       <h2>Home</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Crop Type:</label>
//           <input
//             type="text"
//             value={cropType}
//             onChange={(e) => setCropType(e.target.value)}
//             placeholder="Enter crop type"
//           />
//         </div>
//         <div>
//           <label>Location:</label>
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Enter your location"
//           />
//           <button type="button" onClick={useCurrentLocation}>
//             Use Current Location
//           </button>
//         </div>
//         <div>
//           <label>Farm Area (in acres):</label>
//           <input
//             type="text"
//             value={farmArea}
//             onChange={(e) => setFarmArea(e.target.value)}
//             placeholder="Enter farm area"
//           />
//         </div>
//         <div>
//           <label>Do you have a crop selected?</label>
//           <select
//             value={cropSelected}
//             onChange={(e) => setCropSelected(e.target.value)}
//           >
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Home;


import React, { useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [cropType, setCropType] = useState("Rice-Kharif");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [cropSelected, setCropSelected] = useState("Yes");
  // const [predictionDate, setPredictionDate] = useState("");
  // const [predictionResult, setPredictionResult] = useState(null);
  // const [district, setDistrict] = useState('');
  // const [date, setDate] = useState('');
  const [predictionDate, setPredictionDate] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     const response = await axios.post("http://localhost:5000/predict", {
  //       district,
  //       date: predictionDate
  //     });
  //     setPredictionResult(response.data);
  //   } catch (error) {
  //     console.error("Error fetching prediction:", error);
  //     alert("Unable to fetch prediction. Please try again.");
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/predict', {
  //       district,
  //       date,
  //     });

  //     console.log('Prediction:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching prediction:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        date: predictionDate,
      });
      setPredictionResult(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Unable to fetch prediction. Please try again.");
    }
  };
  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please check location settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Crop Type:</label>
          <select value={cropType} onChange={(e) => setCropType(e.target.value)}>
            <option value="Rice-Kharif">Rice-Kharif</option>
            <option value="Rice-Rabi">Rice-Rabi</option>
          </select>
        </div>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
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
          <select value={cropSelected} onChange={(e) => setCropSelected(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        {/* <div>
          <label>Prediction Date:</label>
          <input
            type="date"
            value={predictionDate}
            onChange={(e) => setPredictionDate(e.target.value)}
          />
        </div>
        <button type="submit">Get Prediction</button>
      </form>

      {predictionResult && (
        <div>
          <h3>Prediction Results:</h3>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </div>
      )}
    </div> */}
    <div>
          <label>Prediction Date:</label>
          <input
            type="date"
            value={predictionDate}
            onChange={(e) => setPredictionDate(e.target.value)}
          />
        </div>
        <button type="submit">Get Prediction</button>
      </form>

      {predictionResult && (
        <div>
          <h3>Prediction Results:</h3>
          <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
