"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { updateRideStatus } from "@/actions/actions";

interface AcceptanceButtonProps {
  id: number;
  status: string;
}

const AcceptanceButton = ({ id, status }: AcceptanceButtonProps) => {

  const [loading, setLoading] = useState(false); // State for button loading

  // Function to handle the Accept button click
  const handleAccept = async () => {
    setLoading(true);
    try {
      // Update the ride status to "ongoing"
      await updateRideStatus(id, "ongoing");
      

      // Send SMS via the API
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rideId: id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send SMS");
      }

      const result = await response.json();
      console.log("SMS sent successfully:", result);
      alert("SMS sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        {status === "ongoing" ? (
          <Button className="bg-green-600">Ongoing</Button>
        ) : (
          // <Button
          //   className="bg-accent"
          //   onClick={() => updateRideStatus(id, "ongoing")}
          // >
          //   Accept
          // </Button>
          <Button
            className="bg-accent"
            onClick={handleAccept} // Only send SMS when this button is clicked
            disabled={loading}
          >
            {loading ? "Processing..." : "Accept"}
          </Button>
          
        )}
          {/* <Button
            className="bg-accent"
            onClick={handleAccept} // Only send SMS when this button is clicked
            disabled={loading}
          >
            {loading ? "Processing..." : "Accept"}
          </Button> */}

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
