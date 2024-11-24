import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import districtsGeoJSON from "./districts.json"; 

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const TelanganaMap = () => {
  const [position, setPosition] = useState(null); 
  const [map, setMap] = useState(null); 


  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); 
        if (map) map.flyTo([lat, lng], 12); 
      },
    });

    return position ? <Marker position={position}></Marker> : null;
  };

    
    const geoJSONStyle = {
      color: "black", 
      weight: 1, 
      opacity: 1,
      fillOpacity: 0.1, 
    };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pick a Location on the Telangana Map</h1>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>
          Latitude:
          <input
            type="text"
            value={position ? position[0] : ""}
            readOnly
            style={{ marginLeft: "10px", width: "200px" }}
          />
        </label>
        <label style={{ marginLeft: "20px", marginRight: "10px" }}>
          Longitude:
          <input
            type="text"
            value={position ? position[1] : ""}
            readOnly
            style={{ marginLeft: "10px", width: "200px" }}
          />
        </label>
      </div>

      <MapContainer
        center={[17.6, 79.1]} 
        zoom={7} 
        style={{ height: "500px", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON data={districtsGeoJSON} style={geoJSONStyle} />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default TelanganaMap;
