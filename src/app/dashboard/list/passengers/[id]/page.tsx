import { createUser, editGuest } from "@/actions/actions";
import GuestDelete from "@/components/admin/forms/GuestDelete";
import Layout from "@/components/layout/Layout";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddUser from "@/components/forms/AddUserForm";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MdError } from "react-icons/md";

interface GuestParams {
  id: number;
}

export default async function guest({ params }: { params: GuestParams }) {
  // get one guest

  const guest = await prisma.guest.findUnique({
    where: {
      // dynamic params are strings. convert to a number
      id: Number(params.id),
    },
  });

  return (
    <>
      <div>
        <section className="contact-section fix mt-12">
          <div className="container">
            <div className="contact-wrapper-2">
              <div className="row g-4 ">
                {/* guest details */}

                <div className="col-lg-6">
                  <div className="contact-content">
                    <h2 className="text-[40px] font-semibold">
                      Guest information
                    </h2>

                    {guest?.isVerified === false ? (
                      <div className="flex items-center">
                        <MdError
                          size={24}
                          style={{ color: "red", marginRight: "8px" }}
                        />
                        This user is not verified
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <VscVerifiedFilled
                          size={24}
                          style={{ color: "green", marginRight: "8px" }}
                        />
                        This user is already verified
                      </div>
                    )}

                    <form className="contact-form-items">
                      <div className="form-clt">
                        <span>ID</span>
                        <input
                          type="text"
                          name="id"
                          id="id"
                          defaultValue={guest?.id || ""}
                          placeholder="Your Name"
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
                        />
                      </div>
                    </form>
                  </div>
                </div>

                {/* create a new user account */}

                <div className="col-lg-6">
                  <div className="contact-content">
                    {guest?.isVerified === false ? (
                      <AddUser
                        guestId={guest?.id}
                        guestEmail={guest?.email ?? undefined}
                        guestType={guest?.type}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
