"use client";
import { deleteGuest } from "@/actions/actions";
import React from "react";

interface GuestDeleteProps {
  guestId: number;
}

const GuestDelete = (guest: GuestDeleteProps) => {
  return (
    <button
      onClick={async () => {
        await deleteGuest(guest.guestId);
      }}
    >
      Delete
    </button>
  );
};

export default GuestDelete;
