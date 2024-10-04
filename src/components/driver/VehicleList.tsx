import React from "react";
import Link from "next/link";

interface Vehicle {
  id: number;
  number: string;
  make: string;
  seatCount: number;
  type: string;
}

interface VehicleListProps {
  vehiclesList: Vehicle[]; // Expecting an array of Vehicle objects
}

const VehicleList = ({ vehiclesList }: VehicleListProps) => {
  return (
    <div className="wow fadeInUp my-12" data-wow-delay=".3s">
      <h3
        style={{
          margin: "20px 0",
        }}
      >
        Your current vehicle
      </h3>
      {/* <VehicleCard /> */}
      {vehiclesList.map((vehicle) => (
        <div className="service-box-items vehicle-list" key={vehicle.id}>
          <div className="icon">
            <img src="/assets/img/service/icon/s-icon-1.svg" alt="icon-img" />
          </div>
          <div className="content">
            <h4>
              <Link href="/service-details">{vehicle.number}</Link>
            </h4>
            <p>{vehicle.make}</p>
            <p>{vehicle.seatCount} Seats</p>
            <Link href="/service-details" className="theme-btn-2 mt-3">
              Manage Vehicle <i className="fa-solid fa-arrow-right-long" />{" "}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
