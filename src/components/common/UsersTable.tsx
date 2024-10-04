import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { VscVerifiedFilled } from "react-icons/vsc";
import { MdError } from "react-icons/md";

interface User {
  id: number;
  name: string | null;
  email: string | null;
  isVerified: boolean;
}

interface UsersTableProps {
  users: User[];
  usertype: string;
}

const UsersTable = ({ users, usertype }: UsersTableProps) => {
  return (
    <div className="m-6">
      <h2 className="mb-8 font-bold text-3xl">Manage users</h2>
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <Link href={`${usertype}/${user.id}`}>{user.id} </Link>
              </TableCell>
              <TableCell>
                <Link href={`${usertype}/${user.id}`}>{user.name} </Link>
              </TableCell>
              {/*<TableCell>{user.phone}</TableCell> */}
              <TableCell className="text-right flex justify-end items-center">
                {user?.isVerified === false ? (
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
};

export default UsersTable;
