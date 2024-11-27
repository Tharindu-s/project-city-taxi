import OngoingRequest from "@/components/driver/OngoingRequest";
import RequestButton from "@/components/driver/RequestButton";
import Layout from "@/components/layout/Layout";
import { getUserByEmail } from "@/lib/auth";
import prisma from "@/lib/db";
import { cookies } from "next/headers";
import React from "react";
import jwt from "jsonwebtoken";
import VehicleList from "@/components/driver/VehicleList";
import Link from "next/link";
import GetCurrentLocation from "@/components/driver/GetCurrentLocation";
import { BigSwitchRadio } from "@/components/big-switch-radio";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function DriverPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return <div>Access Denied</div>;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET ?? "");
  } catch (error) {
    console.error("Invalid token:", error);
    return <div>Access Denied</div>;
  }

  const { email, type } = decodedToken as { email: string; type: string };

  if (type !== "driver") {
    return <div>Access Denied</div>;
  }

  const user = await getUserByEmail(email);

  console.log("user", user);

  if (!user) {
    return <div>Access Denied</div>;
  }

  const requests = await prisma.ride.findMany({
    select: {
      id: true,
      pickupLocation: true,
      dropLocation: true,
      distant: true,
      amount: true,
      passengerId: true,
      status: true,
    },

    where: {
      driverId: user.guestId.toString(),
      status: {
        in: ["pending", "ongoing"],
      },
    },
  });

  // get ongoing requests

  const ongoingRequests = await prisma.ride.findMany({
    select: {
      id: true,
      pickupLocation: true,
      dropLocation: true,
      distant: true,
      amount: true,
      passengerId: true,
      status: true,
    },
    where: {
      driverId: user.guestId.toString(),
      status: "ongoing",
    },
  });

  // get added vehicles

  const vehiclesList = await prisma.vehicleDetails.findMany({
    select: {
      id: true,
      number: true,
      make: true,
      seatCount: true,
      type: true,
    },
    where: {
      driverId: user.guestId.toString(),
      // driverId: "1",
    },
  });

  return (
    <div>
      <Layout
        headerStyle={1}
        footerStyle={1}
        onePageNav={undefined}
        breadcrumbTitle={undefined}
      >
        <section
          className="contact-section fix"
          style={{
            paddingTop: "50px",
          }}
        >
          <div className="container">
            <div>
              <h2 className="wow fadeInUp my-12" data-wow-delay=".3s">
                Welcome &nbsp;{user.username}!
              </h2>
            </div>
            {vehiclesList.length === 0 ? (
              <Link href="/driver/add-vehicle">
                <button
                  type="submit"
                  className="theme-btn"
                  style={{
                    marginTop: "30px",
                  }}
                >
                  Add a new vehicle{" "}
                  <i className="fa-solid fa-arrow-right-long" />
                </button>{" "}
              </Link>
            ) : (
              <VehicleList vehiclesList={vehiclesList} />
            )}

            {/* Trip managment and driver status */}
            
            {ongoingRequests.length === 0 ? (
              <div> <BigSwitchRadio driverId={user.guestId.toString()} />
              <GetCurrentLocation driverId={user.guestId.toString()} /> 
              <RequestButton requests={requests} /></div>
              
            ) : (
              <OngoingRequest ongoingRequests={ongoingRequests} />
            )}
             
          </div>
        </section>
      </Layout>
    </div>
  );
}
