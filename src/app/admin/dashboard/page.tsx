// app/admin/dashboard/page.tsx
import Layout from "@/components/layout/Layout";
import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";



export default async function AdminDashboard() {
    const token = cookies().get('token')?.value;
    const user = token ? await getUserByEmail(token) : null;

    if (!user || user.type !== 'admin') {
    return <div>Access Denied</div>;
    }

    return (
        <>
        <Layout
            headerStyle={1}
            footerStyle={1}
            onePageNav={undefined}
            breadcrumbTitle={undefined}
        >
            <div>Welcome to the Admin Dashboard, {user.email}!</div>
        </Layout>
    </>
    );
}
