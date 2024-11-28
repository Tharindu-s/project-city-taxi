// app/api/getVehicle/route.ts
import prisma from "@/lib/db"; // Import Prisma client from the correct path

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vehicleId = searchParams.get("id");

  if (!vehicleId || isNaN(Number(vehicleId))) {
    return new Response(JSON.stringify({ error: "Invalid vehicle ID" }), {
      status: 400,
    });
  }

  try {
    const vehicle = await prisma.vehicleDetails.findUnique({
      where: { id: Number(vehicleId) },
    });

    if (!vehicle) {
      return new Response(JSON.stringify({ error: "Vehicle not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(vehicle), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch vehicle data" }),
      { status: 500 }
    );
  }
}
