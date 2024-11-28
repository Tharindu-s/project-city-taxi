"use client";
import { vehicles } from "@/data/vehicles";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import Map from "@/components/common/MapPassenger";
import { IoMdLocate } from "react-icons/io";
import { DriversList } from "@/components/scrollable-driver-list";

const center = { lat: 6.9271, lng: 79.8612 };
const countryCode = "LK";

export default function BookARide({ userId }) {
  console.log("idid", userId);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY,
    libraries: ["places", "geocoding"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [originAutoComplete, setOriginAutoComplete] = useState(null);
  const [destinationAutoComplete, setDestinationAutoComplete] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [originLatLng, setOriginLatLng] = useState(null); // Store origin lat/lng
  const [destinationLatLng, setDestinationLatLng] = useState(null); // Store destination lat/lng

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
    setOriginLatLng(null); // Clear stored origin lat/lng
    setDestinationLatLng(null); // Clear stored destination lat/lng
  }

  function handleVehicleChange(vehicle) {
    setSelectedVehicle(vehicle);
  }

  function calculateTotal() {
    if (selectedVehicle && distance) {
      const distanceValue = parseFloat(distance.replace(/[^0-9.]/g, ""));
      const totalCost = selectedVehicle.rate * distanceValue;
      return totalCost.toFixed(2);
    }
    return "0";
  }

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };

          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK" && results[0]) {
              originRef.current.value = results[0].formatted_address;
              setOriginLatLng(latlng); // Store current location lat/lng
            } else {
              alert("Unable to retrieve your location");
            }
          });
        },
        () => {
          alert("Error getting location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  // Function to handle place selection from Autocomplete
  const handlePlaceSelect = (place, isOrigin) => {
    if (place.geometry) {
      const latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      if (isOrigin) {
        setOriginLatLng(latLng);
        console.log("Origin Address:", place.formatted_address); // Debugging statement
      } else {
        setDestinationLatLng(latLng);
        console.log("Destination Address:", place.formatted_address); // Debugging statement
      }
    }
  };
  return (
    <div>
      <section className="contact-section fix py-12">
        <div className="container">
          <div className="mb-8">
            <h2>Book a ride</h2>
            <p className="pt-2">
              Locate yourself, pick a location, choose a vehicle and confirm
              your ride.
            </p>
          </div>
          <div className="contact-wrapper-2">
            <div className="row g-4 align-items-center">
              <div className="col-lg-12">
                <div className="h-[50vh] w-full relative">
                  <div className="h-full w-full absolute top-0 left-0">
                    <Map
                      directionsResponse={directionsResponse}
                      setMap={setMap}
                    />
                  </div>

                  <div className="absolute p-4 bg-white shadow-md z-10 mx-3 my-3">
                    <div className="flex gap-2 justify-between">
                      <div style={{ flexGrow: 1 }}>
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            setOriginAutoComplete(autocomplete)
                          }
                          onPlaceChanged={() => {
                            const place = originAutoComplete.getPlace();
                            handlePlaceSelect(place, true); // true for origin
                          }}
                          options={{
                            componentRestrictions: { country: countryCode },
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Where from"
                            ref={originRef}
                            className="w-full p-2 border border-gray-300 text-black"
                          />
                        </Autocomplete>
                      </div>
                      <button
                        onClick={getCurrentLocation}
                        className="bg-[#e89d04] text-white px-4 py-2 border-none cursor-pointer"
                      >
                        <IoMdLocate />
                      </button>

                      <div style={{ flexGrow: 1 }}>
                        <Autocomplete
                          onLoad={(autocomplete) =>
                            setDestinationAutoComplete(autocomplete)
                          }
                          onPlaceChanged={() => {
                            const place = destinationAutoComplete.getPlace();
                            handlePlaceSelect(place, false); // false for destination
                          }}
                          options={{
                            componentRestrictions: { country: countryCode },
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Where to"
                            ref={destinationRef}
                            className="w-full p-2 border border-gray-300 text-black"
                          />
                        </Autocomplete>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={calculateRoute}
                          className="bg-[#e89d04] text-white px-4 py-2 border-none cursor-pointer"
                        >
                          Calculate
                        </button>
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={clearRoute}
                          className="bg-transparent border-none cursor-pointer"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4 justify-between">
                      <span>Distance: {distance} </span>
                      <span>Duration: {duration} </span>
                      <button
                        onClick={() => {
                          map?.panTo(center);
                          map?.setZoom(15);
                        }}
                        className="bg-transparent border-none cursor-pointer"
                      >
                        <FaLocationArrow />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <DriversList
                  latitude={originLatLng ? originLatLng.lat : 6.9271} // Pass user's latitude if available
                  longitude={originLatLng ? originLatLng.lng : 79.8612}
                  selectedVehicle={selectedVehicle}
                  amount={calculateTotal()}
                  destination={destinationLatLng}
                  distance={distance}
                  userId={userId}
                  startAddress={
                    originRef.current ? originRef.current.value : ""
                  } // Pass the start address
                  endAddress={
                    destinationRef.current ? destinationRef.current.value : ""
                  } // Pass the end address
                />
              </div>
              <div className="col-lg-6">
                <div className="">
                  <div className="row g-4">
                    <span>Select an option:</span>
                    <div
                      className="col-lg-12 wow fadeInUp  flex flex-wrap"
                      data-wow-delay=".7s"
                    >
                      {vehicles.map((vehicle) => (
                        <div key={vehicle.id}>
                          <div className="radio-tile-group">
                            <div className="input-container">
                              <input
                                id={`vehicle-${vehicle.id}`} // Unique ID for each vehicle
                                value={vehicle.id}
                                className="radio-button"
                                type="radio"
                                name="radio"
                                onChange={() => handleVehicleChange(vehicle)}
                              />
                              <div className="radio-tile">
                                <div className="icon walk-icon">
                                  <vehicle.icon className="mr-2" />
                                </div>
                                <label
                                  htmlFor={`vehicle-${vehicle.id}`} // Corrected to htmlFor
                                  className="radio-tile-label"
                                >
                                  {vehicle.type}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p>
                      <strong>Total Cost:</strong> {calculateTotal()} LKR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
