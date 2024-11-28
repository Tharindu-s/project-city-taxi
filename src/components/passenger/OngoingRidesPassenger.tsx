import prisma from "@/lib/db";
import RatingForm from "./RateRide";

interface OngoingRidesPassengerProps {
  userId: number;
}

interface Ride {
  id: number;
  pickupLocation: string;
  dropLocation: string;
  status: string;
  amount: string;
  distant: string;
  driverId: string;
}

export default async function OngoingRidesPassenger({
  userId,
}: OngoingRidesPassengerProps) {
  const ongoingRide: Ride | null = await prisma.ride.findFirst({
    where: {
      passengerId: userId.toString(),
      status: "ongoing",
    },
  });
  return (
    <div>
      <section className="contact-section fix">
        <div className="container">
          <div className="wow fadeInUp my-12" data-wow-delay=".3s">
            <h2 className="mb-2">Ongoing Rides</h2>
            <p className="mb-4">Your ongoing ride details</p>

            {ongoingRide ? (
              <div
                className="service-box-items vehicle-list"
                key={ongoingRide.id}
              >
                <div className="content flex">
                  <div className="mr-6"></div>
                  <div>
                    <h4>Ride ID: {ongoingRide.id}</h4>
                    <p>Pick up location: {ongoingRide.pickupLocation}</p>
                    <p>Drop location: {ongoingRide.dropLocation}</p>
                    <p>Status: {ongoingRide.status}</p>
                    <p>Distance: {ongoingRide.distant}</p>
                    <p>Amount: {ongoingRide.amount} LKR</p>
                  </div>
                </div>
                <RatingForm
                  rideId={ongoingRide.id}
                  driverId={ongoingRide.driverId}
                />
              </div>
            ) : (
              <p>No ongoing rides at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
