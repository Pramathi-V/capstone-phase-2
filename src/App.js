import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home"; // Your Home component
import CropRecommendation from "./CropRecommendation";
import Irrigation from "./Irrigation"; // Add more components as needed
import CropGrowthCycle from "./CropGrowthCycle";
import AnomalyDetection from "./AnomalyDetection";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/crop-recommendation">Crop Recommendation</Link>
            </li>
            <li>
              <Link to="/irrigation">Irrigation</Link>
            </li>
            <li>
              <Link to="/crop-growth-cycle">Crop Growth Cycle</Link>
            </li>
            <li>
              <Link to="/anomaly-detection">Anomaly Detection</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crop-recommendation" element={<CropRecommendation />} />
          <Route path="/irrigation" element={<Irrigation />} />
          <Route path="/crop-growth-cycle" element={<CropGrowthCycle />} />
          <Route path="/anomaly-detection" element={<AnomalyDetection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
