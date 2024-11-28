"use client";
import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import "./styles.css";
import Link from "next/link";
import { joinPassenger } from "@/actions/actions";

// zod form validation
const userSchema = z.object({
  name: z.string().max(30, { message: "Name must not exceed 30 charatcers" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 charatcers long" })
    .max(14, { message: "Phone number must not exceed 10 charatcers" }),
  city: z
    .string()
    .max(30, { message: "City must not exceed 30 charatcers" })
    .min(3, { message: "City must be at least 3 charatcers long" }),
  photoUrl: z.string({ message: "Invalid photo URL" }),
});

const PassengerJoin = () => {
  async function clientAction(formdata: FormData) {
    // construct a new user object

    const user = {
      name: formdata.get("name"),
      email: formdata.get("email"),
      phone: formdata.get("phone"),
      city: formdata.get("city"),
      photoUrl: formdata.get("photoUrl"),
    };

    // validation
    const resultClient = userSchema.safeParse(user);
    if (!resultClient.success) {
      let errorMessage = "";

      resultClient.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + "\n";
      });

      toast.error(errorMessage);
      return;
    }
    const result = await joinPassenger(formdata);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(
        "Account details uploaded successfully. City Taxi team will reach out to you soon."
      );
    }
  }

  return (
    <div className="contact-content">
      <h2>Want to join City Taxi as a passenger?</h2>
      <p>
        Fill the below form and we will provide you a new account to join City
        Taxi.
      </p>
      <div
        style={{
          paddingTop: "20px",
        }}
      >
        <Link href="/driver-join">
          <button className="btn">
            <i className="animation"></i>Join as a driver
            <i className="animation"></i>
          </button>
        </Link>
      </div>
      <form action={clientAction} className="contact-form-items">
        <div className="row g-4">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
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
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
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
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
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
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span> Your City*</span>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Your City"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Photo*</span>
              <input
                type="file"
                name="photoUrl"
                id="photoUrl"
                placeholder="Photo"
              />
            </div>
          </div>

          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span> Gender*</span>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    style={{
                      marginRight: "10px",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />
                  <label>Male</label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    style={{
                      marginRight: "10px",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 wow fadeInUp" data-wow-delay=".9s">
            <button type="submit" className="theme-btn">
              Submit <i className="fa-solid fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PassengerJoin;
