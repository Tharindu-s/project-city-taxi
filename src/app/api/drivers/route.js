// app/api/drivers/route.js
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Haversine formula to calculate the distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const latitude = parseFloat(searchParams.get("latitude"));
  const longitude = parseFloat(searchParams.get("longitude"));

  // Check if latitude and longitude are provided and valid
  if (isNaN(latitude) || isNaN(longitude)) {
    return NextResponse.json(
      { message: "Latitude and longitude are required." },
      { status: 400 }
    );
  }

  try {
    // Fetch all drivers from the database
    const drivers = await prisma.driverDetails.findMany({
      where: {
        status: "available", // Only get drivers with available status
      },
    });

    // Filter drivers within 1 km
    const nearbyDrivers = drivers.filter((driver) => {
      const [driverLon, driverLat] = driver.location.split(",").map(Number); // Assuming location is in "lon,lat" format
      return getDistance(latitude, longitude, driverLat, driverLon) <= 1000; // 1 km radius
    });

    return NextResponse.json(nearbyDrivers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while fetching drivers." },
      { status: 500 }
    );
  }
}
