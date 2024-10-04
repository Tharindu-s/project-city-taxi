"use client";
import React from "react";
import { createUser } from "@/actions/actions";
import toast from "react-hot-toast";
import { z } from "zod";

// zod form validation
const userSchema = z
  .object({
    guestId: z.number().optional(),
    email: z.string().email({ message: "Invalid email" }),
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters long" })
      .max(15, { message: "Username must not exceed 15 characters" }),
    type: z.string(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" })
      .max(15, { message: "Password must not exceed 15 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Adjust path to match form field
  });

interface AddUserProps {
  guestId?: number;
  guestEmail?: string;
  guestType?: string;
}

const AddUser = ({ guestId, guestEmail, guestType }: AddUserProps) => {
  async function clientAction(formdata: FormData) {
    // construct a new user object
    const user = {
      guestId: Number(formdata.get("guestId")),
      email: formdata.get("email") as string,
      username: formdata.get("username") as string,
      password: formdata.get("password") as string,
      confirmPassword: formdata.get("confirmPassword") as string,
      type: formdata.get("type") as string,
      imgUrl: "testImg",
    };

    // validation
    const resultClient = userSchema.safeParse(user);
    if (!resultClient.success) {
      let errorMessage = "";

      resultClient.error.issues.forEach((issue) => {
        errorMessage += `${issue.path[0]}: ${issue.message}\n`;
      });

      toast.error(errorMessage);
      return;
    }

    const result = await createUser(formdata);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("User created successfully");
    }
  }

  return (
    <>
      <h2 className="text-[40px] font-semibold">Create an account</h2>
      <p className="text-sm text-gray-400">
        Check the provided details and create a new account
      </p>
      <form action={clientAction} className="contact-form-items">
        <div className="form-clt my-4 hidden">
          <input
            type="text"
            name="guestId"
            id="guestId"
            defaultValue={guestId || ""}
          />
        </div>
        <div className="form-clt my-4 hidden">
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={guestEmail || ""}
          />
        </div>
        <div className="form-clt my-4 hidden">
          <input
            type="text"
            name="type"
            id="type"
            defaultValue={guestType || ""}
          />
        </div>
        <div className="form-clt my-4">
          <span>Username*</span>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
        </div>
        <div className="form-clt my-4">
          <span>Password*</span>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <div className="form-clt my-4">
          <span>Confirm Password*</span>
          <input
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm password"
          />
        </div>

        <div className="col-lg-7 wow fadeInUp my-8" data-wow-delay=".9s">
          <button type="submit" className="theme-btn">
            Create
            <i className="fa-solid fa-arrow-right-long" />
          </button>
        </div>
      </form>
    </>
  );
};

export default AddUser;
