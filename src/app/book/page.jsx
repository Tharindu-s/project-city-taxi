"use client";
import Layout from "@/components/layout/Layout";
import { vehicles } from "@/data/vehicles";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { customMapStyle } from "@/data/CustomMapStyles";
import "./style.css";

const center = { lat: 6.9271, lng: 79.8612 };
const countryCode = "LK";

export default function Contact() {
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
  const [selectedVehicle, setSelectedVehicle] = useState(null); // To track selected vehicle

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

  function handleVehicleChange(vehicle) {
    setSelectedVehicle(vehicle);
  }

  // calculate total

  function calculateTotal() {
    if (selectedVehicle && distance) {
      const distanceValue = parseFloat(distance.replace(/[^0-9.]/g, "")); // Extract numeric distance
      const totalCost = selectedVehicle.rate * distanceValue; // Calculate total cost based on vehicle rate
      return totalCost.toFixed(2); // Return formatted total cost
    }
    return 0; // Return 0 if no vehicle is selected or distance is not available
  }

  return (
    <>
      <Layout
        headerStyle={1}
        footerStyle={1}
        onePageNav={null}
        key={null}
        breadcrumbTitle={null}
      >
        <div>
          <section className="contact-section fix section-padding">
            <div className="container">
              <div className="contact-wrapper-2">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-6">
                    <div
                      style={{
                        height: "50vh",
                        width: "100%",
                        position: "relative",
                      }}
                    >
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
                            styles: customMapStyle,
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
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          padding: "16px",
                          backgroundColor: "white",
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                          zIndex: 1,
                        }}
                        className="mx-3 my-3"
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
                              onLoad={(autocomplete) =>
                                setOriginAutoComplete(autocomplete)
                              }
                              options={{
                                componentRestrictions: { country: countryCode },
                              }}
                            >
                              <input
                                type="text"
                                placeholder="Where from"
                                className="text-black"
                                ref={originRef}
                                style={{
                                  width: "100%",
                                  padding: "8px",
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
                              options={{
                                componentRestrictions: { country: countryCode },
                              }}
                            >
                              <input
                                type="text"
                                placeholder="Where to"
                                className="text-black"
                                ref={destinationRef}
                                style={{
                                  width: "100%",
                                  padding: "8px",
                                  border: "1px solid #ccc",
                                }}
                              />
                            </Autocomplete>
                          </div>
                          <div style={{ display: "flex", gap: "4px" }}>
                            <button
                              onClick={calculateRoute}
                              style={{
                                backgroundColor: "#e89d04",
                                color: "white",
                                padding: "8px 16px",

                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              Calculate
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
                  </div>
                  <div className="col-lg-6">
                    <div className="contact-content">
                      <form
                        id="contact-form"
                        method="POST"
                        className="contact-form-items"
                      >
                        <div className="row g-4">
                          <div
                            className="col-lg-6 wow fadeInUp"
                            data-wow-delay=".3s"
                          ></div>
                          <span>Select an option:</span>
                          <div
                            className="col-lg-12 wow fadeInUp  flex flex-wrap"
                            data-wow-delay=".7s"
                          >
                            {vehicles.map((vehicle) => (
                              <div>
                                <div
                                  className="radio-tile-group"
                                  key={vehicle.id}
                                >
                                  <div className="input-container">
                                    <input
                                      id="walk"
                                      value={vehicle.id}
                                      className="radio-button"
                                      type="radio"
                                      name="radio"
                                      onChange={() =>
                                        handleVehicleChange(vehicle)
                                      }
                                    />
                                    <div className="radio-tile">
                                      <div className="icon walk-icon">
                                        <vehicle.icon className="mr-2" />
                                      </div>
                                      <label
                                        for="walk"
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
                          <div
                            className="col-lg-7 wow fadeInUp"
                            data-wow-delay=".9s"
                          >
                            <p>Total: {calculateTotal()} </p>
                            <button type="submit" className="theme-btn">
                              Book now
                              <i className="fa-solid fa-arrow-right-long" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
