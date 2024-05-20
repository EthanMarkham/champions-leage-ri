import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (typeof query !== 'string') {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
        id: true,
      },
      take: 4, // Limit to top 4 results
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
