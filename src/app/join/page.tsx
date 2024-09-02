import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import img from "../../../public/assets/img/join.jpg";
import { createGuest } from "@/actions/actions";
import prisma from "@/lib/db";

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
                    <div className="contact-content">
                      <h2>Want to join City Taxi?</h2>
                      <p>
                        Fill the below form and we will provide you a new
                        account to join City Taxi.
                      </p>
                      <form action={createGuest} className="contact-form-items">
                        <div className="row g-4">
                          <div
                            className="col-lg-6 wow fadeInUp"
                            data-wow-delay=".3s"
                          >
                            <div className="form-clt">
                              <span>Your name*</span>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Your Name"
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-6 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Your Email*</span>
                              <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Your Email"
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-6 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Your Contact Number*</span>
                              <input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="Your Contact Number"
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-6 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Your City*</span>
                              <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="Your City"
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-7 wow fadeInUp"
                            data-wow-delay=".9s"
                          >
                            <button type="submit" className="theme-btn">
                              Submit
                              <i className="fa-solid fa-arrow-right-long" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
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
