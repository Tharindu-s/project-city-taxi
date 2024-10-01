import { getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
    const token = cookies().get('token')?.value;

    if (!token) {
        return NextResponse.json(null); 
    }

    // Verify and decode the JWT token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET ?? ""); // Verify the token using the secret key
    } catch (error) {
        console.error('Invalid token:', error);
        
    }

    // Extract the email and type from the decoded token
    const { email, type } = decodedToken as { email: string, type: string };

    // Verify the token by fetching the user
    const user = await getUserByEmail(email);
    return NextResponse.json(user); // Return user details if logged in
}