/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "regDate" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "city" TEXT NOT NULL,
    "photoUrl" TEXT,
    "type" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "regDate" TIMESTAMP(3) NOT NULL,
    "guestId" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "dropLocation" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "distant" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rate" (
    "id" SERIAL NOT NULL,
    "rate" TEXT NOT NULL,

    CONSTRAINT "Rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideRating" (
    "id" SERIAL NOT NULL,
    "rating" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "safeDrive" TEXT NOT NULL,
    "professional" TEXT NOT NULL,
    "routeExpertise" TEXT NOT NULL,
    "onTime" TEXT NOT NULL,
    "vehicleState" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,

    CONSTRAINT "RideRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassengerDetails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PassengerDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverDetails" (
    "id" SERIAL NOT NULL,
    "licenceNo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nic" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DriverDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicleDetails" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "seatCount" INTEGER NOT NULL,
    "imgUrl1" TEXT NOT NULL,
    "imgUrl2" TEXT NOT NULL,
    "imgUrl3" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "rateId" TEXT NOT NULL,
    "revLicenceUrl" TEXT NOT NULL,
    "revLicenceExp" TEXT NOT NULL,
    "insuaranceNo" TEXT NOT NULL,
    "insuaranceExp" TEXT NOT NULL,

    CONSTRAINT "vehicleDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PassengerDetails_userId_key" ON "PassengerDetails"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverDetails_userId_key" ON "DriverDetails"("userId");
