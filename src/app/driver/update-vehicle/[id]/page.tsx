"use client";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { updateVehicle } from "@/actions/actions";

const UpdateVehiclePage = ({ params }: { params: { id: string } }) => {
  async function clientAction(formdata: FormData) {
    const result = await updateVehicle(formdata);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Vehicle updated succesfully");
    }
  }

  const vehicleId = Number(params.id);

  if (isNaN(vehicleId)) {
    return notFound();
  }

  type VehicleData = {
    id: number;
    number: string;
    type: string;
    seatCount: number;
    imgUrl1: string;
    imgUrl2: string;
    imgUrl3: string;
    make: string;
    rateId: string;
    revLicenceUrl: string;
    insuaranceNo: string;
    driverId: string;
    insuaranceExp: string;
    revLicenceExp: string;

    // Add other fields as necessary
  };

  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
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

  useEffect(() => {
    async function fetchVehicleData() {
      const response = await fetch(`/api/get-vehicle?id=${vehicleId}`);

      if (!response.ok) {
        toast.error("Vehicle not found.");
        return;
      }

      const data = await response.json();
      setVehicleData(data);
    }

    fetchVehicleData();
  }, [vehicleId]);

  if (!vehicleData) {
    return <div>Loading...</div>;
  }

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
                  <div className="col-lg-12">
                    <div className="contact-content">
                      <h2>Change vehicle information</h2>
                      <p>Use this field to update your vehicle information.</p>
                      <form
                        action={clientAction}
                        className="contact-form-items"
                      >
                        <div className="row g-4">
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".3s"
                          >
                            <input
                              type="text"
                              name="id"
                              value={vehicleData.id}
                              hidden
                            />
                            <div className="form-clt">
                              <span>Vehicle number*</span>
                              <input
                                type="text"
                                name="number"
                                id="number"
                                placeholder="Vehicle number"
                                value={vehicleData.number}
                                onChange={(e) =>
                                  setVehicleData({
                                    ...vehicleData,
                                    number: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Seat count*</span>
                              <input
                                type="text"
                                name="seatCount"
                                id="seatCount"
                                placeholder="Seat count"
                                value={vehicleData.seatCount}
                                onChange={(e) =>
                                  setVehicleData({
                                    ...vehicleData,
                                    seatCount: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Insuarance Number*</span>
                              <input
                                type="text"
                                name="insuaranceNo"
                                id="insuaranceNo"
                                placeholder="Insuarance number"
                                value={vehicleData.insuaranceNo}
                                onChange={(e) =>
                                  setVehicleData({
                                    ...vehicleData,
                                    insuaranceNo: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Insuarance Exp Date*</span>
                              <input
                                type="text"
                                name="insuaranceExp"
                                id="insuaranceExp"
                                placeholder="Insuarance Exp Date"
                                value={vehicleData.insuaranceExp}
                                onChange={(e) =>
                                  setVehicleData({
                                    ...vehicleData,
                                    insuaranceExp: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Revenue Licence Exp Date*</span>
                              <input
                                type="text"
                                name="revLicenceExp"
                                id="revLicenceExp"
                                placeholder="Revenue Licence Exp Date"
                                value={vehicleData.revLicenceExp}
                                onChange={(e) =>
                                  setVehicleData({
                                    ...vehicleData,
                                    revLicenceExp: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <div className="form-clt">
                              <span>Make</span>
                              <input
                                type="text"
                                name="make"
                                id="make"
                                placeholder="Make"
                                value={vehicleData.make}
                                onChange={(e) =>
                                  setVehicleData({
                                    ...vehicleData,
                                    make: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
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
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
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
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
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
                          <div
                            className="col-lg-4 wow fadeInUp hidden"
                            data-wow-delay=".5s"
                          >
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
                          <div
                            className="col-lg-4 wow fadeInUp hidden"
                            data-wow-delay=".5s"
                          >
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
                          <div
                            className="col-lg-4 wow fadeInUp hidden"
                            data-wow-delay=".5s"
                          >
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

                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <Image
                              src={
                                vehicleData.imgUrl1
                                  ? `/${vehicleData.imgUrl1
                                      .slice(
                                        "G:\\GitHub\\project-city-taxi\\public\\"
                                          .length
                                      )
                                      .replace(/\\/g, "/")}`
                                  : "/default-image.jpg"
                              }
                              alt="Vehicle Image"
                              width={400}
                              height={250}
                            />
                          </div>
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <Image
                              src={
                                vehicleData.imgUrl2
                                  ? `/${vehicleData.imgUrl2
                                      .slice(
                                        "G:\\GitHub\\project-city-taxi\\public\\"
                                          .length
                                      )
                                      .replace(/\\/g, "/")}`
                                  : "/default-image.jpg"
                              }
                              alt="Vehicle Image"
                              width={400}
                              height={250}
                            />
                          </div>
                          <div
                            className="col-lg-4 wow fadeInUp"
                            data-wow-delay=".5s"
                          >
                            <Image
                              src={
                                vehicleData.imgUrl3
                                  ? `/${vehicleData.imgUrl3
                                      .slice(
                                        "G:\\GitHub\\project-city-taxi\\public\\"
                                          .length
                                      )
                                      .replace(/\\/g, "/")}`
                                  : "/default-image.jpg"
                              }
                              alt="Vehicle Image"
                              width={400}
                              height={250}
                            />
                          </div>

                          <div
                            className="col-lg-7 wow fadeInUp"
                            data-wow-delay=".9s"
                          >
                            <button type="submit" className="theme-btn">
                              Update
                              <i className="fa-solid fa-arrow-right-long" />
                            </button>{" "}
                          </div>
                        </div>
                      </form>
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
};

export default UpdateVehiclePage;
