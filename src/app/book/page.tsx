import React from "react";
import BookARide from "../../components/passenger/BookRide";
const JWT_SECRET = process.env.JWT_SECRET;
import { cookies } from "next/headers";
import { getUserByEmail } from "@/lib/auth";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
import OngoingRidesPassenger from "@/components/passenger/OngoingRidesPassenger";
import Layout from "@/components/layout/Layout";

export default async function Book() {
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

  if (type !== "passenger") {
    return <div>Access Denied</div>;
  }

  const user = await getUserByEmail(email);

  console.log("user", user);

  if (!user) {
    return <div>Access Denied</div>;
  }

  const userId = await prisma.passengerDetails.findUnique({
    select: {
      id: true,
    },

    where: {
      id: user.guestId,
    },
  });

  if (!userId) {
    return <div>Access Denied</div>;
  }

  const id = userId.id;
  console.log(userId);

  return (
    <div>
      <Layout
        headerStyle={1}
        footerStyle={1}
        onePageNav={null}
        key={null}
        breadcrumbTitle={null}
      >
        <OngoingRidesPassenger userId={id} />
        <BookARide userId={id} />
      </Layout>
    </div>
  );
}
