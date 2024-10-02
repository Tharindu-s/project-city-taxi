import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function VehicleCard() {
  return (
    <div className="service-box-items vehicle-list">
      <div className="icon">
        <img src="/assets/img/service/icon/s-icon-1.svg" alt="icon-img" />
      </div>
      <div className="content">
        <h4>
          <Link href="/service-details">Database Security</Link>
        </h4>
        <p>Mauris ultrices ligula eget volutpat aliquet nullam</p>
        <Link href="/service-details" className="theme-btn-2 mt-3">
          read More
          <i className="fa-solid fa-arrow-right-long" />
        </Link>
      </div>
    </div>
  );
}
