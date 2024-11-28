import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

const prisma = new PrismaClient();

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER as string;

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
    try {
        // Parse the request body
        const { rideId }: { rideId: number } = await req.json();

        // Fetch the ride details
        const ride = await prisma.ride.findUnique({
        where: { id: rideId },
        });

        if (!ride) {
        return NextResponse.json(
            { success: false, error: "No ride found for the specified ID" },
            { status: 404 }
        );
        }

        // Fetch driver details associated with the ride
        const driver = await prisma.driverDetails.findUnique({
        where: { id: parseInt(ride.driverId) }, // Convert driverId to integer if necessary
        });

        if (!driver) {
        return NextResponse.json(
            { success: false, error: "Driver not found for the ride" },
            { status: 404 }
        );
        }

        // Fetch passenger details associated with the ride
        const passenger = await prisma.passengerDetails.findUnique({
        where: { id: parseInt(ride.passengerId) }, // Convert passengerId to integer if necessary
        });

        if (!passenger) {
        return NextResponse.json(
            { success: false, error: "Passenger not found for the ride" },
            { status: 404 }
        );
        }

        // Construct the SMS message
        const message = `
            Ride Details:
            Pickup Location: ${ride.pickupLocation}
            Drop Location: ${ride.dropLocation}
            Status: Accepted
            Amount: ${ride.amount}
            Distance: ${ride.distant} km

            Driver Details:
            Name: ${driver.name}
            Contact: ${driver.contact}
            Licence No: ${driver.licenceNo}
            Verified: ${driver.isVerified ? "Yes" : "No"}
            Gender: ${driver.gender}

        `;

        // Send SMS using Twilio to the passenger's contact number
        const sms = await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: passenger.contact, // Ensure the passenger's contact is a valid phone number
        });

        return NextResponse.json({ success: true, sms });
    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.json(
        { success: false, error: (error as Error).message },
        { status: 500 }
        );
    }
}
