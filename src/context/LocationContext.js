"use client";
import React, { createContext, useState, useEffect } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

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

  useEffect(() => {
    getLocation(); // Get location when the provider mounts
  }, []);

  return (
    <LocationContext.Provider value={{ location, error, getLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return React.useContext(LocationContext);
};
