"use client";
import React from "react";
import { useLocation } from "../../context/LocationContext";

const GetCurrentLocation = () => {
  const { location, error, getLocation } = useLocation();

  return (
    <div>
      <button onClick={getLocation}>Update my location</button>

      {location.latitude !== null && location.longitude !== null ? (
        <div>
          <h3>Latitude: {location.latitude}</h3>
          <h3>Longitude: {location.longitude}</h3>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default GetCurrentLocation;
