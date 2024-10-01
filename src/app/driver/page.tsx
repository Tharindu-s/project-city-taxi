import OngoingRequest from "@/components/driver/OngoingRequest";
import RequestButton from "@/components/driver/RequestButton";
import ToggleSwitch from "@/components/driver/ToggleSwitch";
import Layout from "@/components/layout/Layout";
import { getUserByEmail } from "@/lib/auth";
import prisma from "@/lib/db";
import { cookies } from "next/headers";
import React from "react";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function DriverPage() {
  
  const token = cookies().get('token')?.value;

  if (!token) {
      return <div>Access Denied</div>;
  }

  let decodedToken;
  try {
      decodedToken = jwt.verify(token, JWT_SECRET ?? "");
  } catch (error) {
      console.error('Invalid token:', error);
      return <div>Access Denied</div>;
  }

  const { email, type } = decodedToken as { email: string, type: string };

  if (type !== 'driver') {
      return <div>Access Denied</div>;
  }

  const user = await getUserByEmail(email);

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
      driverId: user.id.toString(),
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
      driverId: "7",
      status: "ongoing",
    },
  });

  return (
    <>
      <Layout
        headerStyle={1}
        footerStyle={1}
        onePageNav={undefined}
        breadcrumbTitle={undefined}
      >
        <div className="px-32">
          <h2 className="wow fadeInUp my-12" data-wow-delay=".3s">
            Welcome &nbsp;{user.username}!
          </h2>
        </div>
        <ToggleSwitch />
        <div className="px-32">
          <h2 className="wow fadeInUp my-12" data-wow-delay=".3s">
            Ongoing rides
          </h2>
        </div>
        {ongoingRequests.length === 0 ? (
          <RequestButton requests={requests} />
        ) : (
          <OngoingRequest ongoingRequests={ongoingRequests} />
        )}
      </Layout>
    </>
  );
}
