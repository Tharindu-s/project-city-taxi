import prisma from "@/lib/db";
import React from "react";
import AddUser from "@/components/forms/AddUserForm";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MdError } from "react-icons/md";
import UserInfo from "@/components/common/UserInfo";

interface GuestParams {
  id: number;
}

export default async function guest({ params }: { params: GuestParams }) {
  // get one guest
  const guest = await prisma.guest.findUnique({
    where: {
      // dynamic params are strings. convert to a number
      id: Number(params.id),
    },
  });

  return <>{guest ? <UserInfo guest={guest} /> : <div>Guest not found</div>}</>;
}
