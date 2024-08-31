import { createGuest } from "@/actions/actions";
import React from "react";

const page = () => {
  return (
    <div>
      <form action={createGuest}>
        <label htmlFor="username">Email</label>
        <input type="text" name="email" className="text-black" id="email" />
        <label htmlFor="username">Name</label>
        <input type="text" name="name" className="text-black" id="name" />
        <label htmlFor="username">City</label>
        <input type="text" name="city" className="text-black" id="city" />
        <button type="submit">Request an account</button>
      </form>
    </div>
  );
};

export default page;
