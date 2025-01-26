import React, { useState } from "react";
import { GoogleMap, LoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";

const GoogleMapComponent = ({ restaurants, userLocation }) => {
  const containerStyle = {
    width: "100%",
    height: "94vh",
  };

  // Default center for the map
  const center = userLocation || { lat: 19.126760890130438, lng: 72.84976249009534 };

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
        {/* User Location Marker */}
        {userLocation && (
          <MarkerF
            position={userLocation}
            
            title="You are here"
           
          />
        )}

        {/* Restaurant Markers */}
        {restaurants.map((restaurant, index) => (
          <MarkerF
            key={index}
            position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
            title={restaurant.name}
            onClick={() => handleMarkerClick(restaurant)}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
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
