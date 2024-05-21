import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  const limit = searchParams.get("limit");
  const sort = searchParams.get("sort");
  const orderByField = searchParams.get("orderBy");

  let where: Prisma.UserWhereInput = {};

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (id && !isNaN(Number(id))) {
    where.id = Number(id);
  }

  let take = 20; // Default limit
  if (limit && !isNaN(Number(limit))) {
    take = Number(limit);
  }

  let orderBy: Prisma.UserOrderByWithRelationInput = { name: "asc" }; // Default order
  if (orderByField && (orderByField === "name" || orderByField === "id")) {
    orderBy = { [orderByField]: sort === "desc" ? "desc" : "asc" };
  }

  try {
    const users = await prisma.user.findMany({
      where,
      select: {
        name: true,
        id: true,
      },
      take,
      orderBy,
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
