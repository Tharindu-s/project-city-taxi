import Layout from "@/components/layout/Layout";
import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function BookingPage() {
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

  if (!user) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <Layout
        headerStyle={1}
        footerStyle={1}
        onePageNav={undefined}
        breadcrumbTitle={undefined}
      >
        <div>Welcome to the Booking Page, {user.email}!</div>
      </Layout>
    </div>
  );
}
