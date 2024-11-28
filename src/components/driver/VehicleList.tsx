import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Vehicle {
  id: number;
  number: string;
  make: string;
  seatCount: number;
  type: string;
  imgUrl1: string;
  insuaranceExp: string;
  revLicenceExp: string;
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
          <div className="content flex">
            <div className="mr-6">
              <Image
                src={
                  vehicle.imgUrl1
                    ? `/${vehicle.imgUrl1
                        .slice("G:\\GitHub\\project-city-taxi\\public\\".length)
                        .replace(/\\/g, "/")}`
                    : "/default-image.jpg"
                }
                alt="Vehicle Image"
                width={400}
                height={250}
              />
            </div>
            <div>
              <h4>{vehicle.number}</h4>
              <p>{vehicle.make}</p>
              <p>{vehicle.seatCount} Seats</p>
              <p>Insuarance expires on{" " + vehicle.insuaranceExp}</p>
              <p>Revenue License expires on{" " + vehicle.revLicenceExp}</p>

              <Link
                href={`driver/update-vehicle/${vehicle.id}`}
                className="theme-btn-2 mt-3"
              >
                Manage Vehicle <i className="fa-solid fa-arrow-right-long" />{" "}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
