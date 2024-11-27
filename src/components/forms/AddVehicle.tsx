"use client";
import React, { useEffect, useState } from "react";
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

const AddVehicle = ({ driverId }: { driverId: string }) => {
  const [image1, setImage1] = useState<string>("");
  const [image2, setImage2] = useState<string>("");
  const [image3, setImage3] = useState<string>("");
  const [image4, setImage4] = useState<string>("");

  const uploadFile = async (file: File, index: number) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const fileContent = reader.result as string;
      const fileName = file.name;

      // Send the file content (base64) and file name to the backend
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName, fileContent }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully uploaded file, now update the state
        console.log(`File uploaded: ${data.filePath}`);

        // Update state based on the index
        if (index === 1) setImage1(data.filePath);
        if (index === 2) setImage2(data.filePath);
        if (index === 3) setImage3(data.filePath);
        if (index === 4) setImage4(data.filePath);
      } else {
        console.error("Error uploading file:", data.error);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file, index);
    }
  };

  useEffect(() => {
    console.log("img1", image1);
    console.log("img2", image2);
    console.log("img3", image3);
    console.log("img4", image4);
  }, [image1, image2, image3, image4]);

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
          <div className="col-lg-6 wow fadeInUp " data-wow-delay=".5s">
            <div className="form-clt">
              <span>driver*</span>
              <input
                type="text"
                name="imgUrl1"
                id="imgUrl1"
                placeholder="imgUrl1"
                value={image1}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp " data-wow-delay=".5s">
            <div className="form-clt">
              <span>driver*</span>
              <input
                type="text"
                name="imgUrl2"
                id="imgUrl2"
                placeholder="imgUrl2"
                value={image2}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp " data-wow-delay=".5s">
            <div className="form-clt">
              <span>driver*</span>
              <input
                type="text"
                name="imgUrl3"
                id="imgUrl3"
                placeholder="imgUrl3"
                value={image3}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp " data-wow-delay=".5s">
            <div className="form-clt">
              <span>driver*</span>
              <input
                type="text"
                name="revLicenceUrl"
                id="imgUrl4"
                placeholder="imgUrl4"
                value={image4}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Vehicle Image 1*</span>
              <input
                type="file"
                id="imgUrl1"
                placeholder="Photo"
                onChange={(event) => handleFileChange(event, 1)}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Vehicle Image 2*</span>
              <input
                type="file"
                id="imgUrl2"
                placeholder="Photo"
                onChange={(event) => handleFileChange(event, 2)}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Vehicle Image 3*</span>
              <input
                type="file"
                id="imgUrl3"
                placeholder="Photo"
                onChange={(event) => handleFileChange(event, 3)}
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
                type="file"
                name="revLicenceUrl"
                placeholder="Photo"
                onChange={(event) => handleFileChange(event, 4)}
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
                className="hidden"
                defaultValue={driverId}
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
