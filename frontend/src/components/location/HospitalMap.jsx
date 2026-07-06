import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

export default function HospitalMap({ userLocation, hospitals }) {
  const [selectedHospital, setSelectedHospital] = React.useState(null);

  if (!userLocation) return null;

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={12}
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
            <div style={{ maxWidth: "220px" }}>
              <h3 style={{ margin: 0, fontWeight: "bold" }}>
                {selectedHospital.name}
              </h3>
              <p style={{ margin: "6px 0" }}>{selectedHospital.address}</p>
              <p style={{ margin: 0 }}>
                Rating: {selectedHospital.rating || "N/A"}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}