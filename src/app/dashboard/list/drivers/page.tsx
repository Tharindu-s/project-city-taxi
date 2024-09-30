import prisma from "@/lib/db";
import UsersTable from "@/components/common/UsersTable";
import React from "react";

export default async function TableDemo() {
  const guests = await prisma.guest.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
    },
    orderBy: {
      isVerified: "asc",
    },
    where: {
      type: "driver",
    },
  });

  return (
    <>
      <UsersTable users={guests} usertype="drivers" />
    </>
  );
}
