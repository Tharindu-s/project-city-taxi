import prisma from "@/lib/db";
import React from "react";
import UserInfo from "@/components/common/UserInfo";

interface GuestParams {
  id: number;
}

export default async function guest({ params }: { params: GuestParams }) {
  // get one guest
  const guest = await prisma.passengerDetails.findUnique({
    where: {
      // dynamic params are strings. convert to a number
      id: Number(params.id),
    },
  });

  console.log(guest);

  return (
    <>{guest ? <UserInfo guest={guest} /> : <div>Passenger not found</div>}</>
  );
}
