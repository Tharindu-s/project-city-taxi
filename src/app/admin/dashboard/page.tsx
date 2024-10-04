// app/admin/dashboard/page.tsx
import Layout from "@/components/layout/Layout";
import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function AdminDashboard() {
  // Retrieve the JWT token from cookies
  const token = cookies().get("token")?.value;

  // If no token is present, deny access
  if (!token) {
    return <div>Access Denied</div>;
  }

  // Verify and decode the JWT token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET ?? ""); // Verify the token using the secret key
  } catch (error) {
    console.error("Invalid token:", error);
    return <div>Access Denied</div>;
  }

  // Extract the email and type from the decoded token
  const { email, type } = decodedToken as { email: string; type: string };

  // Check if the user is an admin
  if (type !== "admin") {
    return <div>Access Denied</div>;
  }

  // Optionally, retrieve more user details from the database if needed
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
        <div>Welcome to the Admin Dashboard, {user.email}!</div>
      </Layout>
    </div>
  );
}
