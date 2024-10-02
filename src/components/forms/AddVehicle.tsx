"use client";
import React from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import "./styles.css";
import { addVehicle } from "@/actions/actions";

// zod form validation
const vehicleSchema = z.object({
  number: z
    .string()
    .max(8, { message: "Number must not exceed 7 characters" })
    .includes("-", { message: "Number must include a hyphen (-)" }),
  type: z.string({ message: "Please select a type" }),

  imgUrl1: z.string({ message: "Invalid photo URL" }),
  imgUrl2: z.string({ message: "Invalid photo URL" }),
  imgUrl3: z.string({ message: "Invalid photo URL" }),
  make: z.string(),
  revLicenceUrl: z.string({ message: "Invalid photo URL" }),
  insuaranceNo: z.string(),
  driverId: z.string(),
});

const AddVehicle = () => {
  async function clientAction(formdata: FormData) {
    // construct a new user object

    const vehicle = {
      number: formdata.get("number"),
      type: formdata.get("type"),
      seatCount: formdata.get("seatCount"),
      imgUrl1: formdata.get("imgUrl1"),
      imgUrl2: formdata.get("imgUrl2"),
      imgUrl3: formdata.get("imgUrl3"),
      make: formdata.get("make"),
      revLicenceUrl: formdata.get("revLicenceUrl"),
      revLicenceExp: formdata.get("revLicenceExp"),
      insuaranceNo: formdata.get("insuaranceNo"),
      insuaranceExp: formdata.get("insuaranceExp"),
      driverId: formdata.get("driverId"),
    };

    // validation
    const resultClient = vehicleSchema.safeParse(vehicle);
    if (!resultClient.success) {
      let errorMessage = "";

      resultClient.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + "\n";
      });

      toast.error(errorMessage);
      return;
    }
    const result = await addVehicle(formdata);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Vehicle added successfully.");
    }
  }

  return (
    <div className="contact-content">
      <h2>Add a vehicle?</h2>
      <p>
        Fill the below form and we will provide you a new account to join City
        Taxi.
      </p>
      <div
        style={{
          paddingTop: "20px",
        }}
      ></div>
      <form action={clientAction} className="contact-form-items">
        <div className="row g-4">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
            <div className="form-clt">
              <span>Vehicle number*</span>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="Vehicle number"
              />
            </div>
          </div>

          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span> Seat count*</span>
              <input
                type="text"
                name="seatCount"
                id="seatCount"
                placeholder="Seat count"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Vehicle Image 1*</span>
              <input
                type="text"
                name="imgUrl1"
                id="imgUrl1"
                placeholder="Photo"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Vehicle Image 2*</span>
              <input
                type="text"
                name="imgUrl2"
                id="imgUrl2"
                placeholder="Photo"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Vehicle Image 3*</span>
              <input
                type="text"
                name="imgUrl3"
                id="imgUrl3"
                placeholder="Photo"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Make</span>
              <input type="text" name="make" id="make" placeholder="Make" />
            </div>
          </div>
          <div className="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span> Type*</span>
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  marginTop: "15px",
                }}
              >
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="type"
                    value="economy"
                    className="inputBox"
                  />
                  <label>Economy</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="type"
                    value="luxury"
                    className="inputBox"
                  />
                  <label>Luxury</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="type"
                    value="van"
                    className="inputBox"
                  />
                  <label>Van</label>
                </div>
                <div className="inputDiv">
                  <input
                    type="radio"
                    name="type"
                    value="minivan"
                    className="inputBox"
                  />
                  <label>Minivan</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Revenue Licence Image*</span>
              <input
                type="text"
                name="revLicenceUrl"
                id="revLicenceUrl"
                placeholder="Photo"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Licence Expiry date*</span>
              <input type="date" id="revLicenceExp" name="revLicenceExp" />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Insuarance Expiry date*</span>
              <input type="date" id="insuaranceExp" name="insuaranceExp" />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Insuarance Number</span>
              <input
                type="text"
                name="insuaranceNo"
                id="insuaranceNo"
                placeholder="Photo"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Driver Id</span>
              <input
                type="text"
                name="driverId"
                id="driverId"
                placeholder="Photo"
              />
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

export default AddVehicle;
