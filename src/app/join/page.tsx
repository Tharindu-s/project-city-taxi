import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import img from "../../../public/assets/img/join.jpg";
import { createGuest } from "@/actions/actions";
import prisma from "@/lib/db";
import PassengerJoin from "@/components/forms/PassengerJoin";

export default async function Contact() {
  const guests = await prisma.guest.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      city: true,
    },
  });
  return (
    <>
      <Layout
        headerStyle={1}
        footerStyle={1}
        onePageNav={undefined}
        breadcrumbTitle={undefined}
      >
        <div>
          <section className="contact-section fix section-padding">
            <div className="container">
              <div className="contact-wrapper-2">
                <div className="row g-4 align-items-center">
                  <div className="col-lg-6">
                    <PassengerJoin />
                  </div>
                  <div className="col-lg-6">
                    <div className="map-section">
                      <div className="map-items">
                        <div className="googpemap">
                          <Image
                            src={img}
                            height={600}
                            width={600}
                            alt="join img"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              {" "}
              <div className="col-lg-6 align-items-center">
                {guests.map((guest) => (
                  <Link href={`/join/${guest.id}`}>
                    <div className="col-lg-2">
                      <h3>{guest.name}</h3>
                      <h3>{guest.email}</h3>
                      <h3>{guest.phone}</h3>
                      <h4>{guest.city}</h4>
                      <button>edit</button>
                      <br />
                      <button>delete</button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
