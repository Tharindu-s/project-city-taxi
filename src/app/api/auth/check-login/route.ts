import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET() {
    const token = cookies().get('token')?.value;

    if (!token) {
        return NextResponse.json(null); 
    }

    // Verify the token by fetching the user
    const user = await getUserByEmail(token);
    return NextResponse.json(user); // Return user details if logged in
}