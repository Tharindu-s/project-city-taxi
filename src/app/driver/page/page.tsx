
import Layout from "@/components/layout/Layout";
import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function DriverPage() {
    const token = cookies().get('token')?.value;
    const user = token ? await getUserByEmail(token) : null;

    if (!user || user.type !== 'driver') {
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
                
                <div>Welcome to the Driver Page, {user.email}!</div>
            </Layout>
        </>
        
    );
    
}