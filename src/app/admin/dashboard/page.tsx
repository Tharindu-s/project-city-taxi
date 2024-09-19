// app/admin/dashboard/page.tsx
import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";



export default async function AdminDashboard() {
    const token = cookies().get('token')?.value;
    const user = token ? await getUserByEmail(token) : null;

    if (!user || user.type !== 'admin') {
    return <div>Access Denied</div>;
    }

    return <div>Welcome to the Admin Dashboard, {user.email}!</div>;
}
