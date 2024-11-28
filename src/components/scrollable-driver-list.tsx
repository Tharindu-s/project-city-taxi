"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";
import { passengerRideBook } from "@/actions/actions";
import toast from "react-hot-toast";

interface Driver {
  id: number;
  name: string;
  nic: string;
  status: string;
}

interface Vehicle {
  id: number;
  type: string;
  rate: number;
  icon: React.ElementType; // Assuming icon is a React component
}

interface DriversListProps {
  latitude: number;
  longitude: number;
  selectedVehicle: Vehicle | null;
  amount: string;
  destination: { lat: number; lng: number } | null;
  distance: string;
  userId: number;
  startAddress: string;
  endAddress: string;
}

// Define the component without using React.FC
export const DriversList = ({
  latitude,
  longitude,
  selectedVehicle,
  amount,
  destination,
  distance,
  userId,
  startAddress,
  endAddress,
}: DriversListProps) => {
  console.log("Start Address:", startAddress);
  console.log("End Address:", endAddress);
  async function clientAction(formdata: FormData) {
    const result = await passengerRideBook(formdata);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        "Ride added succesfully. Please wait for the driver to accept the ride."
      );
    }
  }

  console.log("userId", userId);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  console.log(
    `Latitude: ${latitude}, 
    Longitude: ${longitude}, 
    Selected Vehicle: ${selectedVehicle ? selectedVehicle.type : "None"}, 
    Total Amount: ${amount} LKR, 
    Destination: ${
      destination ? `(${destination.lat}, ${destination.lng})` : "Not set"
    }, 
    Distance: ${distance}`
  );

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver((prevDriver) =>
      prevDriver?.id === driver.id ? null : driver
    );
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          `/api/drivers?latitude=${latitude}&longitude=${longitude}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const data: Driver[] = await response.json();
        setDrivers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [latitude, longitude]);

  if (loading) {
    return <div>Loading drivers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Card className="w-full shadow-none rounded-none">
        <CardContent className="p-4 border border-gray-100">
          <span>Select a driver</span>
          <ScrollArea className="h-[300px] w-full rounded-md   p-2">
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className={` last:mb-0 p-3 rounded-md transition-colors ${
                  selectedDriver?.id === driver.id
                    ? "bg-primary/10"
                    : "hover:bg-secondary"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{driver.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      NIC: {driver.nic}
                    </p>
                    <p className="text-accent">Available</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSelectDriver(driver)}
                    aria-label={
                      selectedDriver?.id === driver.id
                        ? "Deselect driver"
                        : "Select driver"
                    }
                  >
                    <CheckCircle
                      className={`h-5 w-5 ${
                        selectedDriver?.id === driver.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
          {selectedDriver && (
            <div className="mt-4 p-3 bg-accent rounded-md">
              <h4 className="font-semibold">Selected Driver:</h4>
              <p>
                {selectedDriver.name} - {selectedDriver.nic}
              </p>
              <input
                type="text"
                className="hidden"
                defaultValue={selectedDriver.id}
              />
            </div>
          )}
          <form action={clientAction}>
            <input
              className="hidden text-black border border-black"
              type="text"
              name="pickupLocation"
              defaultValue={startAddress}
            />

            <input
              className="hidden text-black border border-black"
              type="text"
              defaultValue={selectedVehicle ? selectedVehicle.type : ""}
            />
            <input
              className="hidden text-black border border-black"
              type="text"
              name="amount"
              value={amount.toString()}
              readOnly
            />
            <input
              className="hidden text-black border border-black"
              type="text"
              name="dropLocation"
              defaultValue={endAddress}
            />
            <input
              className="hidden text-black border border-black"
              type="text"
              name="distant"
              defaultValue={distance}
            />
            <input
              className="hidden text-black border border-black"
              type="text"
              name="driverId"
              defaultValue={selectedDriver?.id}
            />
            <input
              className="hidden text-black border border-black"
              type="text"
              name="passengerId"
              defaultValue={userId}
            />
            <button type="submit" className="theme-btn mt-8">
              submit
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
