import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";

const GoogleMapComponent = ({ restaurants }) => {
  const containerStyle = {
    width: "100%",
    height: "90vh",
  };

  // Default center for the map (set to the first restaurant's location or a default value)
  const center = restaurants.length
    ? { lat: restaurants[0].latitude, lng: restaurants[0].longitude }
    : { lat: 0, lng: 0 }; // Fallback center in case no data is passed

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseClick = () => {
    setSelectedMarker(null);
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Render markers based on restaurants passed as props */}
        {restaurants.map((restaurant, index) => (
          <MarkerF
            key={index}
            position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
            title={restaurant.name}
            onClick={() => handleMarkerClick(restaurant)} // Pass restaurant details to state
          />
        ))}

        {/* InfoWindow for selected marker */}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude,
              lng: selectedMarker.longitude,
            }}
            onCloseClick={handleCloseClick}
          >
            <div>
              <h4 style={{ margin: 0 }}>{selectedMarker.name}</h4>
              <p style={{ margin: 0 }}>{selectedMarker.address}</p>
              <p style={{ margin: 0 }}>{selectedMarker.cuisine}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
