import prisma from "@/lib/db";
import UsersTable from "@/components/common/UsersTable";

export default async function TableDemo() {
  const guests = await prisma.passengerDetails.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
    },
    orderBy: {
      isVerified: "asc",
    },
  });

  return (
    <div>
      <UsersTable users={guests} usertype="passengers" />
    </div>
  );
}
