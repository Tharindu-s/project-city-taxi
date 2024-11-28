"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { addRating } from "@/actions/actions";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
}

function StarRating({ value, onChange }: RatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= (hover || value)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function RatingForm({
  rideId,
  driverId,
}: {
  rideId: number;
  driverId: string;
}) {
  const [driverRating, setDriverRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [experienceRating, setExperienceRating] = useState(0);
  const [otherRating, setOtherRating] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the submission logic here
    console.log({
      driverRating,
      cleanlinessRating,
      experienceRating,
      otherRating,
    });
    setOpen(false);
    // Reset form
    setDriverRating(0);
    setCleanlinessRating(0);
    setExperienceRating(0);
    setOtherRating(0);
  };

  async function clientAction(formdata: FormData) {
    const result = await addRating(formdata);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Review added succesfully");
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <p className="pl-6 font-bold mt-4">Rate Your Experience</p>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate Your Experience</DialogTitle>
          </DialogHeader>
          <form action={clientAction} className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label>Driver Rating</Label>
              <StarRating value={driverRating} onChange={setDriverRating} />
              <input
                className="text-black hidden"
                type="text"
                value={driverRating}
                name="professional"
              />
            </div>
            <div className="space-y-2">
              <Label>Experience Rating</Label>
              <StarRating
                value={experienceRating}
                onChange={setExperienceRating}
              />
              <input
                className="text-black hidden"
                type="text"
                value={experienceRating}
                name="safeDrive"
              />
            </div>
            <div className="space-y-2">
              <Label>Vehicle state Rating</Label>
              <StarRating
                value={cleanlinessRating}
                onChange={setCleanlinessRating}
              />
              <input
                className="text-black hidden"
                type="text"
                value={cleanlinessRating}
                name="vehicleState"
              />
            </div>

            <div className="space-y-2">
              <Label>Arrival on time</Label>
              <StarRating value={otherRating} onChange={setOtherRating} />
              <input
                className="text-black hidden"
                type="text"
                value={otherRating}
                name="onTime"
              />
            </div>

            <Textarea className="max-h-32" name="comment" />
            <input
              className="text-black hidden"
              type="text"
              value={rideId}
              name="rideId"
            />
            <input
              className="text-black hidden"
              type="text"
              value={driverId}
              name="driverId"
            />
            <Button
              type="submit"
              className="w-full bg-[#e89d04]"
              disabled={
                !driverRating ||
                !cleanlinessRating ||
                !experienceRating ||
                !otherRating
              }
            >
              Submit Ratings
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
