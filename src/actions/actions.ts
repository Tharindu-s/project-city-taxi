"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

// create guest

// export async function createGuest(formdata: FormData) {
//   const email = formdata.get("email") as string;

//   try {
//     // Check if the email already exists
//     const existingGuest = await prisma.guest.findUnique({
//       where: { email },
//     });

//     if (existingGuest) {
//       return {
//         error: "Email already exists.",
//       };
//     }

//     // Create the new guest if the email doesn't exist
//     await prisma.guest.create({
//       data: {
//         name: formdata.get("name") as string,
//         email: email,
//         phone: formdata.get("phone") as string,
//         city: formdata.get("city") as string,
//         type: formdata.get("type") as string,
//         gender: formdata.get("gender") as string,
//       },
//     });

//     console.log("Guest created successfully");
//   } catch (error) {
//     console.error("Error creating guest:", error);
//     return {
//       error: "Error adding user",
//     };
//   }

//   revalidatePath("/join");
// }

// create passenger guest

export async function joinPassenger(formdata: FormData) {
  const email = formdata.get("email") as string;

  try {
    // Check if the email already exists
    const existingPassenger = await prisma.passengerDetails.findUnique({
      where: { email },
    });

    const existingDriver = await prisma.driverDetails.findUnique({
      where: { email },
    });

    if (existingPassenger) {
      return {
        error: "Email already exists. Login instead",
      };
    } else if (existingDriver) {
      return {
        error: "Driver account found for this email. Use a different email.",
      };
    }

    // Create the new guest if the email doesn't exist
    await prisma.passengerDetails.create({
      data: {
        name: formdata.get("name") as string,
        email: email,
        contact: formdata.get("phone") as string,
        city: formdata.get("city") as string,
        type: formdata.get("type") as string,
        gender: formdata.get("gender") as string,
        photoUrl: formdata.get("photoUrl") as string,
      },
    });

    console.log("Guest created successfully");
  } catch (error) {
    console.error("Error creating guest:", error);
    return {
      error: "Error adding user",
    };
  }

  // revalidatePath("/join");
}

// create driver guest

export async function joinDriver(formdata: FormData) {
  const email = formdata.get("email") as string;

  try {
    // Check if the email already exists
    const existingDriver = await prisma.driverDetails.findUnique({
      where: { email },
    });

    const existingPassenger = await prisma.driverDetails.findUnique({
      where: { email },
    });

    if (existingDriver) {
      return {
        error: "Email already exists. Login instead.",
      };
    } else if (existingPassenger) {
      return {
        error: "Passenger account found for this email. Use a different email.",
      };
    }

    // Create the new guest if the email doesn't exist
    await prisma.driverDetails.create({
      data: {
        name: formdata.get("name") as string,
        email: email,
        contact: formdata.get("phone") as string,
        city: formdata.get("city") as string,
        gender: formdata.get("gender") as string,
        nic: formdata.get("nic") as string,
        dob: formdata.get("dob") as string,
        date: new Date(),
        imgUrl: formdata.get("imgUrl") as string,
        licenceNo: formdata.get("licenceNo") as string,
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

// create new vehicle

export async function addVehicle(formdata: FormData) {
  const number = formdata.get("number") as string;

  try {
    // Check if the email already exists
    const existingVehicle = await prisma.vehicleDetails.findUnique({
      where: { number },
    });

    if (existingVehicle) {
      return {
        error: "vehicle already exists.",
      };
    }

    // Create a new vehicle
    await prisma.vehicleDetails.create({
      data: {
        number: formdata.get("number") as string,
        type: formdata.get("type") as string,
        seatCount: Number(formdata.get("seatCount")),
        imgUrl1: formdata.get("imgUrl1") as string,
        imgUrl2: formdata.get("imgUrl2") as string,
        imgUrl3: formdata.get("imgUrl3") as string,
        make: formdata.get("make") as string,
        rateId: formdata.get("rateId") as string,
        revLicenceUrl: formdata.get("revLicenceUrl") as string,
        revLicenceExp: formdata.get("revLicenceExp") as string,
        insuaranceNo: formdata.get("insuaranceNo") as string,
        insuaranceExp: formdata.get("insuaranceExp") as string,
        driverId: formdata.get("driverId") as string,
      },
    });

    console.log("vehicle created successfully");
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return {
      error: "Error creating vehicle",
    };
  }

  revalidatePath("/driver");
}

// update guests

// export async function editGuest(formdata: FormData) {
//   const guestId = formdata.get("id") as string;
//   try {
//     await prisma.guest.update({
//       where: {
//         id: Number(guestId),
//       },
//       data: {
//         name: formdata.get("name") as string,
//         email: formdata.get("email") as string,
//         phone: formdata.get("phone") as string,
//         city: formdata.get("city") as string,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating guest:", error);
//   }
//   revalidatePath("/join/[id]");
// }

// delete guests

// export async function deleteGuest(id: number) {
//   try {
//     await prisma.guest.delete({
//       where: { id },
//     });
//   } catch (error) {
//     return {
//       error: "Error deleting user",
//     };
//   }
// }

// create user

export async function createUser(formdata: FormData) {
  try {
    const hashedPassword = await bcrypt.hash(
      formdata.get("password") as string,
      10
    );
    await prisma.users.create({
      data: {
        email: formdata.get("email") as string,
        username: formdata.get("username") as string,
        password: hashedPassword,
        type: formdata.get("type") as string,
        regDate: new Date(),
        guestId: Number(formdata.get("guestId")),
      },
    });

    //  Update the verified state

    const userType = formdata.get("type") as string;

    if (userType === "passenger") {
      await prisma.passengerDetails.update({
        where: {
          id: Number(formdata.get("guestId")),
        },
        data: {
          isVerified: true,
        },
      });
    } else if (userType === "driver") {
      await prisma.driverDetails.update({
        where: {
          id: Number(formdata.get("guestId")),
        },
        data: {
          isVerified: true,
        },
      });
    }

    console.log("Guest created successfully");
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }

  revalidatePath("/join");
}

// driver ride acceptance

export async function updateRideStatus(rideId: number, newStatus: string) {
  await prisma.ride.update({
    where: { id: rideId },
    data: { status: newStatus },
  });
  revalidatePath("/driver");
}

// get driver count

export async function getActiveDriverCount() {
  try {
    const count = await prisma.driverDetails.count({
      where: {
        status: "active",
      },
    });
    return count;
  } catch (error) {
    console.error("Error fetching active driver count:", error);
    throw new Error("Failed to retrieve active driver count");
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
