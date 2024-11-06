import React, { createContext, useState } from "react";

// Create the context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  // Define the state variables and their setters
  const [cropType, setCropType] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [district, setDistrict] = useState("");
  const [districtImage, setDistrictImage] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [predictionDate, setPredictionDate] = useState("");

  // The context value to be passed to child components
  const contextValue = {
    cropType,
    setCropType,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    district,
    setDistrict,
    districtImage,
    setDistrictImage,
    farmArea,
    setFarmArea,
    growthStage,
    setGrowthStage,
    predictionDate,
    setPredictionDate,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
