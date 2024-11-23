import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const TelanganaMap = () => {
  const [position, setPosition] = useState(null); // Store clicked location
  const [map, setMap] = useState(null); // Store reference to the map

  // Component to handle map events (click to set position and zoom)
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); // Update clicked position
        if (map) map.flyTo([lat, lng], 12); // Zoom in to clicked location
      },
    });

    return position ? <Marker position={position}></Marker> : null;
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
        center={[17.6, 79.1]} // Approx center of Telangana
        zoom={7} // Initial zoom level
        style={{ height: "500px", width: "100%" }}
        whenCreated={setMap} // Save reference to the map instance
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default TelanganaMap;
