import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AcceptanceButton from "@/components/driver/AcceptanceButton";

const OngoingRequest = ({ ongoingRequests }: any) => {
  return (
    <div>
      {ongoingRequests.map((ride: any) => (
        <Card className="shadow-none rounded-none mx-auto my-4 w-[90%] 2xl:w-[50%]">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{ride.pickupLocation}</p>
            <p>{ride.dropLocation}</p>
          </CardContent>
          <CardFooter>
            <AcceptanceButton id={ride.id} status={ride.status} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OngoingRequest;
