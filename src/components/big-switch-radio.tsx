"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import { updateStatus } from "@/actions/actions";

export function BigSwitchRadio({ driverId }: { driverId: string }) {
  async function clientAction(formdata: FormData) {
    const result = await updateStatus(formdata);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Status changed succesfully");
    }
  }
  const [value, setValue] = useState("available");

  return (
    <div className="flex items-center justify-center my-12">
      <form action={clientAction}>
        <input type="hidden" name="driverId" value={driverId} />
        <RadioGroup
          name="status"
          value={value}
          onValueChange={setValue}
          className="bg-white rounded-full p-1 flex shadow-lg"
          aria-label="Switch options"
        >
          <div className="relative">
            <RadioGroupItem
              value="available"
              id="available"
              className="peer sr-only"
              type="submit"
            />
            <Label
              htmlFor="available"
              className={`cursor-pointer select-none rounded-full px-6 py-3 text-lg font-medium transition-colors w-32 text-center ${
                value === "available"
                  ? "bg-accent text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
                  : "bg-transparent text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              Available
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem
              value="busy"
              id="busy"
              className="peer sr-only"
              type="submit"
            />
            <Label
              htmlFor="busy"
              className={`cursor-pointer select-none rounded-full px-6 py-3 text-lg font-medium transition-colors w-32 text-center ${
                value === "busy"
                  ? "bg-accent text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
                  : "bg-transparent text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              Busy
            </Label>
          </div>
        </RadioGroup>
      </form>
    </div>
  );
}
