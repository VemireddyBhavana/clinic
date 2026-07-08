import React from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

export default function HospitalMap({ userLocation, hospitals }) {
  const navigate = useNavigate();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedHospital, setSelectedHospital] = React.useState(null);

  // If the API key is missing, invalid, or Maps failed to load — silently skip the map.
  // The hospital cards list below will still render normally.
  if (loadError || !isLoaded || !userLocation) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={12}
      options={{ mapId: "DEMO_MAP_ID" }}
    >
      {/* User location marker */}
      <Marker
        position={userLocation}
        label="You"
      />

      {/* Hospital markers */}
      {hospitals.map((hospital) => {
        if (!hospital.latitude || !hospital.longitude) return null;

        return (
          <Marker
            key={hospital.id || hospital._id}
            position={{
              lat: Number(hospital.latitude),
              lng: Number(hospital.longitude),
            }}
            onClick={() => setSelectedHospital(hospital)}
          />
        );
      })}

      {/* Info popup */}
      {selectedHospital && (
        <InfoWindow
          position={{
            lat: Number(selectedHospital.latitude),
            lng: Number(selectedHospital.longitude),
          }}
          onCloseClick={() => setSelectedHospital(null)}
        >
          <div style={{ maxWidth: "240px", padding: "4px" }}>
            <h3 style={{ margin: "0 0 4px 0", fontWeight: "bold", fontSize: "14px", color: "#0f172a" }}>
              {selectedHospital.name}
            </h3>
            <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#475569" }}>
              {selectedHospital.address}
            </p>
            
            {selectedHospital.phone && (
              <p style={{ margin: "0 0 4px 0", fontSize: "11px", color: "#64748b" }}>
                <strong>Phone:</strong> {selectedHospital.phone}
              </p>
            )}
            {selectedHospital.timings && (
              <p style={{ margin: "0 0 8px 0", fontSize: "11px", color: "#64748b" }}>
                <strong>Hours:</strong> {selectedHospital.timings}
              </p>
            )}
            
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", fontWeight: "bold", color: "#1d4ed8", backgroundColor: "#eff6ff", padding: "2px 6px", borderRadius: "4px" }}>
                ★ {selectedHospital.rating || "4.0"}
              </span>
            </div>

            <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #f1f5f9", paddingTop: "8px" }}>
              <button
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${selectedHospital.latitude},${selectedHospital.longitude}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                style={{
                  flex: 1,
                  backgroundColor: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: "bold",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "center"
                }}
              >
                📍 Street View
              </button>
              <button
                onClick={() => navigate(`/hospital/${selectedHospital.id || selectedHospital._id}`)}
                style={{
                  flex: 1,
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  fontWeight: "bold",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "center"
                }}
              >
                View Details
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
