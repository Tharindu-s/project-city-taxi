"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// create guest

export async function createGuest(formdata: FormData) {
  const email = formdata.get("email") as string;

  try {
    // Check if the email already exists
    const existingGuest = await prisma.guest.findUnique({
      where: { email },
    });

    if (existingGuest) {
      return {
        error: "Email already exists.",
      };
    }

    // Create the new guest if the email doesn't exist
    await prisma.guest.create({
      data: {
        name: formdata.get("name") as string,
        email: email,
        phone: formdata.get("phone") as string,
        city: formdata.get("city") as string,
        type: formdata.get("type") as string,
      },
    });

    console.log("Guest created successfully");
  } catch (error) {
    console.error("Error creating guest:", error);
    return {
      error: "Error adding user",
    };
  }

  revalidatePath("/join");
}

// update guests

export async function editGuest(formdata: FormData) {
  const guestId = formdata.get("id") as string;
  try {
    await prisma.guest.update({
      where: {
        id: Number(guestId),
      },
      data: {
        name: formdata.get("name") as string,
        email: formdata.get("email") as string,
        phone: formdata.get("phone") as string,
        city: formdata.get("city") as string,
      },
    });
  } catch (error) {
    console.error("Error updating guest:", error);
  }
  revalidatePath("/join/[id]");
}

// delete guests

export async function deleteGuest(id: number) {
  try {
    await prisma.guest.delete({
      where: { id },
    });
  } catch (error) {
    return {
      error: "Error deleting user",
    };
  }
}

// create user

export async function createUser(formdata: FormData) {
  try {
    await prisma.users.create({
      data: {
        email: formdata.get("email") as string,
        username: formdata.get("username") as string,
        password: formdata.get("password") as string,
        type: formdata.get("type") as string,
        regDate: new Date() as Date,
        guestId: Number(formdata.get("guestId")),
      },
    });

    // Update the guest state to false
    await prisma.guest.update({
      where: {
        id: Number(formdata.get("guestId")),
      },
      data: {
        isVerified: true,
      },
    });

    console.log("Guest created successfully");
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }

  revalidatePath("/join");
}

// export async function edit(formdata: FormData) {
//   const guestId = formdata.get("id") as string;
//   const name = formdata.get("name") as string;
//   const email = formdata.get("name") as string;
//   const phone = formdata.get("name") as string;
//   const city = formdata.get("name") as string;

//   await prisma.guest.update({
//     where: {
//       id: Number(guestId),
//     },
//     data: {
//       name,
//       email,
//       phone,
//       city,
//     },
//   });

//   revalidatePath("/better");
// }
