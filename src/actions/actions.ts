"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createGuest(formdata: FormData) {
  await prisma.guest.create({
    data: {
      email: formdata.get("email") as string,
      name: formdata.get("name") as string,
      city: formdata.get("city") as string,
    },
  });

  // revalidatePath("/posts");
}
  