"use client";
import React from "react";
import { useLocation } from "../../context/LocationContext";
import toast from "react-hot-toast";
import { updateLocation } from "@/actions/actions";

const GetCurrentLocation = ({ driverId }: { driverId: string }) => {
  const { location, error, getLocation } = useLocation();

  async function clientAction(formdata: FormData) {
    const result = await updateLocation(formdata);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Location updated successfully");
    }
  }

  return (
    <div>
      {location.latitude !== null && location.longitude !== null ? (
        <div>
          <form action={clientAction} className="flex flex-col items-center">
            <button onClick={getLocation} type="submit" className="theme-btn">
              Update my location
            </button>

            <div className="hidden">
              <input type="text" name="driverId" defaultValue={driverId} />
              <p>lat</p>
              <input type="text" defaultValue={location.longitude} name="lat" />
              <p>long</p>
              <input type="text" defaultValue={location.latitude} name="long" />
            </div>
          </form>
        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default GetCurrentLocation;
