import prisma from "@/lib/db";
import UsersTable from "@/components/common/UsersTable";
import React from "react";

export default async function TableDemo() {
  const guests = await prisma.driverDetails.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
    },
    orderBy: {
      isVerified: "asc",
    },
  });

  return (
    <>
      <UsersTable users={guests} usertype="drivers" />
    </>
  );
}
