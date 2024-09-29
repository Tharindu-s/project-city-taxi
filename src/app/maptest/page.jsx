"use client";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 6.9271, lng: 79.8612 };

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [originAutoComplete, setOriginAutoComplete] = useState(null);
  const [destinationAutoComplete, setDestinationAutoComplete] = useState(null);

  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <div style={{ height: "50vh", width: "50vw", position: "relative" }}>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {/* Google Map Box */}
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
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

      <div
        style={{
          position: "relative",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1,
          margin: "16px",
          minWidth: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Autocomplete
              onLoad={(autocomplete) => setOriginAutoComplete(autocomplete)}
            >
              <input
                type="text"
                placeholder="Origin"
                className="text-black"
                ref={originRef}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </Autocomplete>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Autocomplete
              onLoad={(autocomplete) =>
                setDestinationAutoComplete(autocomplete)
              }
            >
              <input
                type="text"
                placeholder="Destination"
                className="text-black"
                ref={destinationRef}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </Autocomplete>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={calculateRoute}
              style={{
                backgroundColor: "pink",
                color: "white",
                padding: "8px 16px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Calculate Route
            </button>
            <button
              onClick={clearRoute}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "16px",
            justifyContent: "space-between",
          }}
        >
          <span>Distance: {distance} </span>
          <span>Duration: {duration} </span>
          <button
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaLocationArrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Map;
