import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Ride {
  id: number;
  pickupLocation: string;
  dropLocation: string;
  status: string;
  startTime: string;
  endTime: string;
  amount: string;
  distant: string;
  paymentMethod: string;
  passengerId: string;
  driverId: string;
}

interface RideHistoryProps {
  rideHistory: Ride[];
}

const RideHistory = ({ rideHistory }: RideHistoryProps) => {
  console.log(rideHistory);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Pick up</TableHead>
            <TableHead>Drop</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Distant</TableHead>
            <TableHead>Passenger ID</TableHead>
            <TableHead>Driver ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rideHistory.map((ride) => (
            <TableRow>
              <TableCell className="font-medium">{ride.id}</TableCell>
              <TableCell>{ride.pickupLocation}</TableCell>
              <TableCell>{ride.dropLocation}</TableCell>
              <TableCell>{ride.status}</TableCell>
              <TableCell>{ride.amount}</TableCell>
              <TableCell>{ride.distant}</TableCell>
              <TableCell>{ride.passengerId}</TableCell>
              <TableCell>{ride.driverId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RideHistory;
