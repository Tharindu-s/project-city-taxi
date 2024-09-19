import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}


// export async function verifyPassword(plainPassword: string, storedPassword: string) {
//     // Simple comparison without hashing
//     return plainPassword === storedPassword;
// }

export async function getUserByEmail(email: string) {
    return await prisma.users.findUnique({
    where: { email },
    });
}