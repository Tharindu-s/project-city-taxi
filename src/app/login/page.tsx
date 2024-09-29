"use client";
import Layout from "@/components/layout/Layout";
import Image from "next/image";

import img from "../../../public/assets/img/join.jpg";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.redirectTo) {
      router.push(data.redirectTo);
    } else {
      alert(data.message);
    }
  }

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
                      <form
                        className="contact-form-items"
                        onSubmit={handleSubmit}
                      >
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
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
