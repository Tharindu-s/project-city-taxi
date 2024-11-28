"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import axios from "axios";
import crypto from "crypto";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_API_KEY";

const getAddressFromLatLng = async (lat: string, lng: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    return response.data.results[0]?.formatted_address || "Address not found";
  } catch (error) {
    console.error("Error fetching address:", error);
    return null; // Handle errors by returning null
  }
};

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
        error: "Driver account found for this email. Use a different email.",
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
        licenceNo: formdata.get("licenceNo") as string,
        driverImgUrl: formdata.get("driverImgUrl") as string,
        insuranceImg: formdata.get("insuranceImg") as string,
        licenceImg: formdata.get("licenceImg") as string,
        revLicenceImg: formdata.get("revLicenceImg") as string,
      },
    });

    console.log("Guest created successfully");
  } catch (error: any) {
    // You can specify 'any' to ensure TypeScript doesn't throw an error on 'error' type
    console.error("Error creating guest:", error);

    // Return the actual error message (you can extract more details if needed)
    return {
      error: error.message, // Use the actual error message, or a fallback
    };
  }

  revalidatePath("/join");
}

// create new vehicle

export async function addVehicle(formdata: FormData) {
  const number = formdata.get("number") as string;

  try {
    // Check if the vehicle already exists
    const existingVehicle = await prisma.vehicleDetails.findUnique({
      where: { number },
    });

    if (existingVehicle) {
      return {
        error: "Vehicle already exists.",
      };
    }

    // Create a new vehicle and retrieve its ID
    const newVehicle = await prisma.vehicleDetails.create({
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
      select: {
        id: true,
      },
    });

    // Now update the driver table with the created vehicle ID
    await prisma.driverDetails.update({
      where: {
        id: Number(formdata.get("driverId")),
      },
      data: {
        vehicleId: newVehicle.id.toString(),
      },
    });

    console.log("Vehicle created and assigned to driver successfully");
  } catch (error) {
    console.error("Error creating vehicle or assigning to driver:", error);
    return {
      error: "Error creating vehicle or assigning to driver",
    };
  }

  revalidatePath("/driver");
}

// update a vehicle

export async function updateVehicle(formdata: FormData) {
  const id = Number(formdata.get("id"));

  try {
    // Ensure the vehicle exists before updating
    const existingVehicle = await prisma.vehicleDetails.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return {
        error: "Vehicle not found.",
      };
    }

    // Update the vehicle details
    await prisma.vehicleDetails.update({
      where: { id },
      data: {
        number: formdata.get("number") as string,
        // type: formdata.get("type") as string,
        seatCount: Number(formdata.get("seatCount")),
        imgUrl1: formdata.get("imgUrl1") as string,
        imgUrl2: formdata.get("imgUrl2") as string,
        imgUrl3: formdata.get("imgUrl3") as string,
        make: formdata.get("make") as string,
        // revLicenceUrl: formdata.get("revLicenceUrl") as string,
        revLicenceExp: formdata.get("revLicenceExp") as string,
        insuaranceNo: formdata.get("insuaranceNo") as string,
        insuaranceExp: formdata.get("insuaranceExp") as string,
      },
    });

    console.log("Vehicle updated successfully");

    // Revalidate any relevant paths
    revalidatePath(`/driver/update-vehicle/${id}`);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return {
      error: "Error updating vehicle",
    };
  }
}

export async function createUser(formdata: FormData) {
  const email = formdata.get("email") as string;
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

    // Read the HTML template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "email-templates",
      "passenger-account-created",
      "passenger-account-created.html"
    );

    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your City Taxi Credentials",
      html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        console.log("Failed to send email");
        return { error: "Failed to send email" };
      } else {
        console.log("Email sent");
        return { status: "success", message: "Email sent" };
      }
    });
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }

  revalidatePath("/join");
}

// generate password reset token

export async function generateResetToken(email: string) {
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // generate a secure token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours

  // save the token in the database
  await prisma.passwordResetTokens.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  // generate the reset link
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  // Step 5: Send the email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 24 hours.</p>`,
  });

  return { success: true, message: "Password reset link sent successfully." };
}

// reset pasword

export async function resetPassword(token: string, newPassword: string) {
  // Step 1: Find the token in the database
  const resetToken = await prisma.passwordResetTokens.findFirst({
    where: { token },
  });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    throw new Error("Invalid or expired token.");
  }

  // Step 2: Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Step 3: Update the user's password
  await prisma.users.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  // Step 4: Delete the token
  await prisma.passwordResetTokens.delete({
    where: { token },
  });

  return { success: true, message: "Password reset successfully." };
}

//driver ride acceptance

export async function updateRideStatus(rideId: number, newStatus: string) {
  await prisma.ride.update({
    where: { id: rideId },
    data: { status: newStatus },
  });
  revalidatePath("/driver");
}

 // Adjust the import based on your setup

// export async function updateRideStatus(rideId: number, newStatus: string) {
//   try {
//     // Update the ride status
//     await prisma.ride.update({
//       where: { id: rideId },
//       data: { status: newStatus },
//     });

//     // Fetch driver details related to the ride
//     const driver = await prisma.driverDetails.findFirst({
//       where: { rides: { some: { id: rideId } } }, // Adjust the condition based on your schema
//       select: {
//         name: true,
//         nic: true,
//         gender: true,
//         licenceNo: true,
//         contact: true,
//       },
//     });

//     // Fetch vehicle details related to the driver
//     const vehicle = await prisma.vehicleDetails.findFirst({
//       where: { driverId: driver?.id }, // Ensure driverId links vehicles to drivers
//       select: {
//         type: true,
//         number: true,
//       },
//     });

//     if (!driver || !vehicle) {
//       throw new Error("Driver or vehicle details not found.");
//     }

//     // Format SMS message
//     const message = `Ride Update: 
//     Driver Name: ${driver.name}
//     NIC: ${driver.nic}
//     Gender: ${driver.gender}
//     Vehicle: ${vehicle.type} (${vehicle.number})
//     Licence No: ${driver.licenceNo}`;

//     // Send SMS using the API route
//     const response = await fetch(`${process.env.BASE_URL}/api/send-sms`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         to: driver.contact,
//         message: message,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(`Failed to send SMS: ${errorData.error}`);
//     }

//     console.log("SMS sent successfully");
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error updating ride status or sending SMS:", error.message);
//     } else {
//       console.error("Error updating ride status or sending SMS:", error);
//     }
//     throw error;
//   }
// }


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

// update location

export async function updateLocation(formdata: FormData) {
  const guestId = formdata.get("driverId") as string;
  const lat = formdata.get("lat") as string;
  const long = formdata.get("long") as string;
  const location = lat + "," + long;
  try {
    await prisma.driverDetails.update({
      where: {
        id: Number(guestId),
      },
      data: {
        location: location,
      },
    });
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
  revalidatePath("/driver");
}

// update driver status

export async function updateStatus(formdata: FormData) {
  const guestId = formdata.get("driverId") as string;

  try {
    await prisma.driverDetails.update({
      where: {
        id: Number(guestId),
      },
      data: {
        status: formdata.get("status") as string,
      },
    });
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
  revalidatePath("/driver");
}

// book a ride

export async function passengerRideBook(formdata: FormData) {
  try {
    // Extract pickup and drop locations (assuming they are in the format "latitude,longitude")
    const pickupLocation = formdata.get("pickupLocation") as string;
    const dropLocation = formdata.get("dropLocation") as string;

    // Split the pickup and drop locations to get latitude and longitude
    const [pickupLat, pickupLng] = pickupLocation.split(",");
    const [dropLat, dropLng] = dropLocation.split(",");

    // Fetch the addresses from the Google Maps API
    const pickupAddress = await getAddressFromLatLng(pickupLat, pickupLng);
    const dropAddress = await getAddressFromLatLng(dropLat, dropLng);

    // Create a new ride with the converted addresses
    await prisma.ride.create({
      data: {
        pickupLocation: pickupAddress || pickupLocation, // Fallback to lat, lng if address not found
        dropLocation: dropAddress || dropLocation, // Fallback to lat, lng if address not found
        status: "pending",
        startTime: new Date().toString(),
        endTime: "pending",
        amount: formdata.get("amount") as string,
        distant: formdata.get("distant") as string,
        paymentMethod: "cash",
        passengerId: formdata.get("passengerId") as string,
        driverId: formdata.get("driverId") as string,
      },
    });

    console.log("Ride added successfully");
  } catch (error) {
    console.error("Error making ride:", error);
    return {
      error: "Error making ride",
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
