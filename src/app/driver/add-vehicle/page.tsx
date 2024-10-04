import AddVehicle from "@/components/forms/AddVehicle";
import Layout from "@/components/layout/Layout";
import { getUserByEmail } from "@/lib/auth";
import React from "react";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function AddVehicles() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return <div>Access Denied</div>;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET ?? "");
  } catch (error) {
    console.error("Invalid token:", error);
    return <div>Access Denied</div>;
  }

  const { email, type } = decodedToken as { email: string; type: string };

  if (type !== "driver") {
    return <div>Access Denied</div>;
  }

  const user = await getUserByEmail(email);

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
                    {user ? (
                      <AddVehicle driverId={user.guestId.toString()} />
                    ) : (
                      <div>User not found</div>
                    )}
                  </div>
                  <div className="col-lg-6">
                    <div className="map-section">
                      <div className="map-items">
                        <div className="googpemap">
                          {/* <Image
                            src={img}
                            height={600}
                            width={600}
                            alt="join img"
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="container">
              {" "}
              <div className="col-lg-6 align-items-center">
                {guests.map((guest) => (
                  <Link href={`/join/${guest.id}`} key={guest.id}>
                    <div className="col-lg-2">
                      <h3>{guest.name}</h3>
                      <h3>{guest.email}</h3>
                      <h3>{guest.phone}</h3>
                      <h4>{guest.city}</h4>
                      <button>edit</button>
                      <br />
                      <button>delete</button>
                    </div>
                  </Link>
                ))}
              </div>
            </div> */}
          </section>
        </div>
      </Layout>
    </div>
  );
}
