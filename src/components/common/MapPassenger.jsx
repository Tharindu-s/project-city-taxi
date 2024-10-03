"use client";
import React from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

const center = { lat: 6.9271, lng: 79.8612 };

const Map = ({ directionsResponse, setMap }) => {
  return (
    <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={(map) => setMap(map)}
    >
      <Marker position={center} />
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            polylineOptions: {
              strokeColor: "#e89d04",
              strokeOpacity: 0.8,
              strokeWeight: 6,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
