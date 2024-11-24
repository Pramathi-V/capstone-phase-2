import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cropType, setCropType] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [district, setDistrict] = useState("");
  const [districtImage, setDistrictImage] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [predictionDate, setPredictionDate] = useState("");


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
