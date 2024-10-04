import Layout from "@/components/layout/Layout";
import Image from "next/image";
import img from "../../../public/assets/img/join.svg";
import React from "react";
import DriverJoin from "@/components/forms/DriverJoin";

export default async function Contact() {
  return (
    <div>
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
                    <DriverJoin />
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
                            className="md:p-12"
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
    </div>
  );
}
