import prisma from "@/lib/db";
import React from "react";
import UserInfo from "@/components/common/UserInfo";

interface GuestParams {
  id: number;
}

export default async function guest({ params }: { params: GuestParams }) {
  // get one guest
  const guest = await prisma.driverDetails.findUnique({
    where: {
      // dynamic params are strings. convert to a number
      id: Number(params.id),
    },
  });

  return <>{guest ? <UserInfo guest={guest} /> : <div>Guest not found</div>}</>;
}
