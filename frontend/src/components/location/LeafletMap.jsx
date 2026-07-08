import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons broken by Webpack/Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom blue "You" marker
const youIcon = new L.DivIcon({
  className: "",
  html: `<div style="
    background: #2563eb;
    border: 3px solid white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    box-shadow: 0 2px 8px rgba(37,99,235,0.5);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

// Helper: re-center map when userLocation changes
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 12);
  }, [center, map]);
  return null;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
  overflow: "hidden",
  zIndex: 0,
};

export default function LeafletMap({ userLocation, hospitals }) {
  const navigate = useNavigate();

  if (!userLocation) return null;

  const center = [userLocation.lat, userLocation.lng];

  return (
    <div style={containerStyle}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap center={center} />

        {/* Your location */}
        <Marker position={center} icon={youIcon}>
          <Popup>📍 Your Location</Popup>
        </Marker>

        {/* Hospital markers */}
        {hospitals.map((hospital) => {
          if (!hospital.latitude || !hospital.longitude) return null;
          return (
            <Marker
              key={hospital.id || hospital._id}
              position={[Number(hospital.latitude), Number(hospital.longitude)]}
            >
              <Popup>
                <div style={{ minWidth: "180px" }}>
                  <strong style={{ fontSize: "13px", color: "#0f172a" }}>
                    {hospital.name}
                  </strong>
                  <p style={{ fontSize: "11px", color: "#475569", margin: "4px 0" }}>
                    {hospital.address}
                  </p>
                  {hospital.phone && (
                    <p style={{ fontSize: "11px", color: "#64748b", margin: "2px 0" }}>
                      📞 {hospital.phone}
                    </p>
                  )}
                  <p style={{ fontSize: "11px", color: "#1d4ed8", margin: "4px 0", fontWeight: "bold" }}>
                    ★ {hospital.rating || "4.0"}
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/hospital/${hospital.id || hospital._id}`)
                    }
                    style={{
                      marginTop: "8px",
                      backgroundColor: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "5px 10px",
                      fontSize: "11px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
