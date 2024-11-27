import Announcements from "@/components/admin/Announcements";
import AttendanceChart from "@/components/admin/AttendanceChart";
import CountChart from "@/components/admin/CountChart";
import EventCalendar from "@/components/admin/EventCalendar";
import FinanceChart from "@/components/admin/FinanceChart";
import UserCard from "@/components/admin/UserCard";
import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function AdminPage() {
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
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
}
