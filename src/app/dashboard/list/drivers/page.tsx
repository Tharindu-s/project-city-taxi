import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/db";
import Link from "next/link";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MdError } from "react-icons/md";

export default async function TableDemo() {
  const guests = await prisma.guest.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
    },
    orderBy: {
      isVerified: "asc",
    },
    where: {
      type: "driver",
    },
  });

  return (
    <div className="m-6">
      <Table className="p-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            {/*  <TableHead>Method</TableHead> */}
            <TableHead className="text-right">Verified status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell className="font-medium">
                <Link href={`users/${guest.id}`}>{guest.id} </Link>
              </TableCell>
              <TableCell>
                <Link href={`users/${guest.id}`}>{guest.name} </Link>
              </TableCell>
              {/*<TableCell>{guest.phone}</TableCell> */}
              <TableCell className="text-right flex justify-end items-center">
                {guest?.isVerified === false ? (
                  <MdError
                    size={24}
                    style={{ color: "red", marginRight: "8px" }}
                  />
                ) : (
                  <VscVerifiedFilled
                    size={24}
                    style={{ color: "green", marginRight: "8px" }}
                  />
                )}
              </TableCell>{" "}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
