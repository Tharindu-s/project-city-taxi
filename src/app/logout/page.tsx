'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        async function logout() {
        // Call the logout API route
        const response = await fetch('/api/auth/logout', { method: 'POST' });

        if (response.ok) {
            // Redirect to login page after successful logout
            router.push('/login');
        }
        }

        logout();
    }, [router]);

    return <div>Logging out...</div>;
}