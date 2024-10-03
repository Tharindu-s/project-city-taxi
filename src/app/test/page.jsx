"use client";
import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const defaultCenter = {
  lat: 6.9271, // Default latitude (Colombo, Sri Lanka)
  lng: 79.8612, // Default longitude
};

const LocationComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  // Load the Google Maps API using the provided API key
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCCeZh7YYss8jdbH3moLB9F3MKm8MHwlGs",
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <div>
      <h1>Get Current Location</h1>
      <button onClick={getLocation}>Get Location</button>

      {location.latitude && location.longitude ? (
        <div>
          <h3>Latitude: {location.latitude}</h3>
          <h3>Longitude: {location.longitude}</h3>

          {/* Google Map displaying the current location */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={{
              lat: location.latitude || defaultCenter.lat,
              lng: location.longitude || defaultCenter.lng,
            }}
          >
            {/* Place a marker at the user's current location */}
            <Marker
              position={{
                lat: location.latitude,
                lng: location.longitude,
              }}
            />
          </GoogleMap>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default LocationComponent;
