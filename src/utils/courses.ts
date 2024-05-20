import { cache } from "react";
import prisma from "@/lib/prisma";

export const getCourses = cache(async () => {
  const courses = await prisma.course.findMany({
    include: {
      layouts: {
        select: {
          name: true,
        },
      },
    },
  });

  return courses;
});
