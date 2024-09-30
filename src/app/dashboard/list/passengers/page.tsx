import prisma from "@/lib/db";
import UsersTable from "@/components/common/UsersTable";

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
      type: "passenger",
    },
  });

  return (
    <>
      <UsersTable users={guests} usertype="passengers" />
    </>
  );
}
