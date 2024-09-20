"use client";

import React from "react";
import { Button } from "../ui/button";
import { updateRideStatus } from "@/actions/actions";

interface AcceptanceButtonProps {
  id: number;
  status: string;
}

const AcceptanceButton = ({ id, status }: AcceptanceButtonProps) => {
  return (
    <div>
      <div className="flex gap-2">
        {status === "ongoing" ? (
          <Button className="bg-green-600">Ongoing</Button>
        ) : (
          <Button
            className="bg-accent"
            onClick={() => updateRideStatus(id, "ongoing")}
          >
            Accept
          </Button>
        )}

        {status === "ongoing" ? (
          <Button
            className="bg-red-600"
            onClick={() => updateRideStatus(id, "ended")}
          >
            End
          </Button>
        ) : (
          <Button
            className="bg-red-600"
            onClick={() => updateRideStatus(id, "declined")}
          >
            Decline
          </Button>
        )}
      </div>
    </div>
  );
};

export default AcceptanceButton;
