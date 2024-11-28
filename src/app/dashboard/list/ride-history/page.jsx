import RideHistory from "@/components/admin/RideHistory";
import "./style.css";
import prisma from "@/lib/db";

export default async function Contact() {
  const rideInfo = await prisma.ride.findMany();

  console.log("sdssd", rideInfo);
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl ml-14">Ride history</h1>
        <section className="my-12 2xl:ml-0 ml-12">
          <div className="container">
            <div className="contact-wrapper-2">
              <RideHistory rideHistory={rideInfo} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
