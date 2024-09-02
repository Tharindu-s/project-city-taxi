"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

// create guest

export async function createGuest(formdata: FormData) {
  await prisma.guest.create({
    data: {
      name: formdata.get("name") as string,
      email: formdata.get("email") as string,
      phone: formdata.get("phone") as string,
      city: formdata.get("city") as string,
    },
  });

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

    // revalidatePath(`/join`);
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
    console.error("Error deleting guest:", error);
  }
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
