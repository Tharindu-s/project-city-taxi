import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";



export default async function BookingPage() {
    const token = cookies().get('token')?.value;
    const user = token ? await getUserByEmail(token) : null;

    if (!user || user.type !== 'passenger') {
        return <div>Access Denied</div>;
    }

    return <div>Welcome to the Booking Page, {user.email}!</div>;
}