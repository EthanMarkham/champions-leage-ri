import prisma from "@/lib/prisma";

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  return users;
}
