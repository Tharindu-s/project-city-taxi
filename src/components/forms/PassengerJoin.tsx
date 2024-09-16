"use client";
import { createGuest } from "@/actions/actions";
import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";

// zod form validation
const userSchema = z.object({
  name: z.string().max(30, { message: "Name must not exceed 30 charatcers" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 charatcers long" })
    .max(10, { message: "Phone number must not exceed 10 charatcers" }),
  city: z
    .string()
    .max(30, { message: "City must not exceed 30 charatcers" })
    .min(3, { message: "City must be at least 3 charatcers long" }),
  type: z.string(),
});

const PassengerJoin = () => {
  async function clientAction(formdata: FormData) {
    // construct a new user object

    const user = {
      name: formdata.get("name"),
      email: formdata.get("email"),
      phone: formdata.get("phone"),
      city: formdata.get("city"),
      type: formdata.get("type"),
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
    const result = await createGuest(formdata);
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
      <h2>Want to join City Taxi?</h2>
      <p>
        Fill the below form and we will provide you a new account to join City
        Taxi.
      </p>
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
              <span>Your City*</span>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="Your City"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <select name="type" id="select">
              <option value="passenger">Passenger</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <div className="col-lg-7 wow fadeInUp" data-wow-delay=".9s">
            <button type="submit" className="theme-btn">
              Submit
              <i className="fa-solid fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PassengerJoin;
