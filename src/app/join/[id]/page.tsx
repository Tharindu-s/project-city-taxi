import { editGuest } from "@/actions/actions";
import GuestDelete from "@/components/admin/forms/GuestDelete";
import Layout from "@/components/layout/Layout";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface GuestParams {
  id: number;
}

export default async function guest({ params }: { params: GuestParams }) {
  const guests = await prisma.guest.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      city: true,
    },
  });

  const guest = await prisma.guest.findUnique({
    where: {
      // dynamic params are strings. convert to a number
      id: Number(params.id),
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
                    <div className="contact-content">
                      <h2>Want to join City Taxi?</h2>
                      <p>
                        Fill the below form and we will provide you a new
                        account to join City Taxi.
                      </p>
                      <form action={editGuest} className="contact-form-items">
                        <div className="form-clt">
                          {" "}
                          <input
                            type="text"
                            name="id"
                            id="id"
                            defaultValue={guest?.id || ""}
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-clt">
                          <span>Your name*</span>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={guest?.name || ""}
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-clt">
                          <span>Your Email*</span>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            defaultValue={guest?.email || ""}
                            placeholder="Your Email"
                          />
                        </div>
                        <div className="form-clt">
                          <span>Your Phone*</span>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            defaultValue={guest?.phone || ""}
                            placeholder="Your Phone"
                          />
                        </div>
                        <div className="form-clt">
                          <span>Your City*</span>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            defaultValue={guest?.city || ""}
                            placeholder="Your City"
                          />
                        </div>
                        <button type="submit">Update</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="map-section">
                      <div className="map-items">
                        <div className="googpemap"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
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
                      <GuestDelete guestId={guest.id} />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="col-lg-6 align-items-center"></div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
