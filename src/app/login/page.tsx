import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import img from "../../../public/assets/img/join.jpg";
import { createGuest } from "@/actions/actions";
import prisma from "@/lib/db";
import PassengerJoin from "@/components/forms/PassengerJoin";

export default async function Contact() {
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
                      <h2>Login</h2>
                      <p>Use youe email and password to login to City Taxi.</p>
                      <form className="contact-form-items">
                        <div className="row g-4">
                          <div
                            className="col-lg-12 wow fadeInUp"
                            data-wow-delay=".3s"
                          >
                            <div className="form-clt">
                              <span>Email</span>
                              <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Your email"
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-12 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Password</span>
                              <input
                                type="text"
                                name="password"
                                id="password"
                                placeholder="Your password"
                              />
                            </div>
                          </div>

                          <div
                            className="col-lg-7 wow fadeInUp"
                            data-wow-delay=".9s"
                          >
                            <button type="submit" className="theme-btn">
                              Login
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
          </section>
        </div>
      </Layout>
    </>
  );
}
