import { cookies } from "next/headers";


export async function POST() {
    const cookieStore = cookies();

    // Clear the authentication cookie
    cookieStore.set('token', '', { httpOnly: true, expires: new Date(0) });

    // Return a response indicating successful logout
    return new Response(JSON.stringify({ message: 'Logged out successfully' }), { status: 200 });
}