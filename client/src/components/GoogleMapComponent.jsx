import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";

const GoogleMapComponent = () => {
  const containerStyle = {
    width: "45%",
    height: "90vh",
  };

  const center = { lat: 40.7128, lng: -74.006 }; // Example: New York

  const markers = [
    { 
      lat: 40.73061, 
      lng: -73.935242,
      name: "Restaurant 1",
      description: "This is a cozy spot with amazing pizza."
    }, 
    { 
      lat: 40.712776, 
      lng: -74.005974,
      name: "Restaurant 2",
      description: "A fine dining experience with a rooftop view."
    }, 
    { 
      lat: 40.758896, 
      lng: -73.98513,
      name: "Restaurant 3",
      description: "Perfect for coffee lovers and quick bites."
    },
  ];

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseClick = () => {
    setSelectedMarker(null);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.name}
            onClick={() => handleMarkerClick(marker)} // Controlled behavior
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={handleCloseClick} // Close the InfoWindow
            options={{ disableCloseButton: false }} 
          >
            <div>
              <h4 style={{ margin: 0 }}>{selectedMarker.name}</h4>
              <p style={{ margin: 0 }}>{selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
