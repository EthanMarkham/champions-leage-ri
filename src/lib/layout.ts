import { cache } from "react";
import prisma from "@/lib/prisma";

export const getLayoutsByCourseId = cache(async (courseId: number) => {
  const layouts = await prisma.layout.findMany({
    include: {
      holes: true,
    },
    where: {
      courseId: courseId,
    },
  });

  return layouts;
});
