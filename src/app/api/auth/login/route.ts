
import { getUserByEmail, verifyPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const user = await getUserByEmail(email);
    if (!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 401 });

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 401 });

    // Set a cookie with the user’s email
    cookies().set('token', user.email, { httpOnly: true, maxAge: 60 * 60 * 24 });

    // Redirect based on user type
    if (user.type === 'admin') {
    return new Response(JSON.stringify({ redirectTo: '/admin/dashboard' }), { status: 200 });
    } else if (user.type === 'passenger') {
    return new Response(JSON.stringify({ redirectTo: '/passenger/booking' }), { status: 200 });
    } else if (user.type === 'driver') {
    return new Response(JSON.stringify({ redirectTo: '/driver/page' }), { status: 200 });
    }
}