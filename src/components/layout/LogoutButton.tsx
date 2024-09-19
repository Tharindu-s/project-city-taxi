'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
    // Redirect to the /logout page, which handles the server action
    router.push('/logout');
    };

    return (
    <button onClick={handleLogout}>
        Logout
    </button>
    );
}