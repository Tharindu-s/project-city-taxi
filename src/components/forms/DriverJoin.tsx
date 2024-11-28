"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import "./styles.css";
import Link from "next/link";
import { joinDriver } from "@/actions/actions";

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
  nic: z.string().max(13, { message: "NIC must not exceed 13 charatcers" }),
  dob: z.string(),
  licenceNo: z.string(),
});

const DriverJoin = () => {
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
    console.log("dirver", image1);
    console.log("insuarance", image2);
    console.log("licence", image3);
    console.log("rev", image4);
  }, [image1, image2, image3, image4]);

  async function clientAction(formdata: FormData) {
    // construct a new user object

    const user = {
      name: formdata.get("name"),
      email: formdata.get("email"),
      phone: formdata.get("phone"),
      city: formdata.get("city"),
      nic: formdata.get("nic"),
      dob: formdata.get("dob"),
      licenceNo: formdata.get("licenceNo"),
      driverImgUrl: formdata.get("driverImgUrl"),
      insuranceImg: formdata.get("insuranceImg"),
      licenceImg: formdata.get("licenceImg"),
      revLicenceImg: formdata.get("revLicenceImg"),
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
    const result = await joinDriver(formdata);
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
      <h2>Want to join City Taxi as a driver?</h2>
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
            <i className="animation"></i>Join as a passenger{" "}
            <i className="animation"></i>{" "}
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
              <span>Your NIC Number*</span>
              <input
                type="text"
                name="nic"
                id="nic"
                placeholder="Your NIC Number"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>DOB*</span>
              <input type="date" id="dob" name="dob" />
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
              <span>Licence Number*</span>
              <input
                type="text"
                name="licenceNo"
                id="licenceNo"
                placeholder="licenceNo"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Licence Number*</span>
              <input
                type="text"
                name="licenceNo"
                id="licenceNo"
                placeholder="licenceNo"
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp hidden" data-wow-delay=".5s">
            <div className="form-clt">
              <span>driver*</span>
              <input
                type="text"
                name="driverImgUrl"
                id="driverImgUrl"
                placeholder="driverImgUrl"
                value={image1}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp hidden" data-wow-delay=".5s">
            <div className="form-clt">
              <span>insu*</span>
              <input
                type="text"
                name="insuranceImg"
                id="insuranceImg"
                placeholder="insuranceImg"
                value={image2}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp hidden" data-wow-delay=".5s">
            <div className="form-clt">
              <span>lic*</span>
              <input
                type="text"
                name="licenceImg"
                id="licenceImg"
                placeholder="licenceImg"
                value={image3}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp hidden" data-wow-delay=".5s">
            <div className="form-clt">
              <span>rev*</span>
              <input
                type="text"
                name="revLicenceImg"
                id="revLicenceImg"
                placeholder="revLicenceImg"
                value={image4}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Driver Image*</span>
              <input
                type="file"
                // name="driverImg"
                // id="driverImg"
                onChange={(event) => handleFileChange(event, 1)}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Insuarance Image*</span>
              <input
                type="file"
                // name="insuaranceImg"
                // id="insuaranceImg"
                onChange={(event) => handleFileChange(event, 2)}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>License Image*</span>
              <input
                type="file"
                // name="licenceImg"
                // id="licenceImg"
                onChange={(event) => handleFileChange(event, 3)}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".5s">
            <div className="form-clt">
              <span>Revenue License Image*</span>
              <input
                type="file"
                // name="revLicenceImg"
                // id="revLicenceImg"
                onChange={(event) => handleFileChange(event, 4)}
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

export default DriverJoin;
