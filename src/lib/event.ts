import prisma from "@/lib/prisma";

export async function findEvent(date: Date, courseName: string, layoutName: string) {
  const course = await prisma.course.findUnique({
    where: { name: courseName },
  });

  if (!course) {
    return {
      event: null,
      error: `Course with name "${courseName}" not found`,
    };
  }

  const layout = await prisma.layout.findFirst({
    where: {
      name: layoutName,
      courseId: course.id,
    },
  });

  if (!layout) {
    return {
      event: null,
      error: `Layout with name "${layoutName}" for course "${courseName}" not found`,
    };
  }

  // Calculate the start and end of the month
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth(); // getUTCMonth() returns 0-11
  const startOfMonth = new Date(Date.UTC(year, month, 1));
  const endOfMonth = new Date(Date.UTC(year, month + 1, 1));

  // Query for events within the time range
  const event = await prisma.event.findFirst({
    where: {
      layoutId: layout.id,
      time: {
        gte: startOfMonth,
        lt: endOfMonth,
      },
    },
  });

  if (!event) {
    return {
      event: null,
      error: `No matching events found.`,
    };
  }

  return { event, error: null };
}

export async function getAllEvents() {
  const events = await prisma.event.findMany({
    include: {
      layout: {
        include: {
          course: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    //where: { name: courseName },
  });

  return events;
}

export async function getCurrentEvent() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const event = await prisma.event.findFirst({
    where: {
      AND: [
        {
          time: {
            gte: new Date(`${currentYear}-${currentMonth.toString().padStart(2, "0")}-01T00:00:00.000Z`),
            lt: new Date(`${currentYear}-${(currentMonth + 1).toString().padStart(2, "0")}-01T00:00:00.000Z`),
          },
        },
      ],
    },
    include: {
      layout: {
        include: {
          course: {
            select: {
              name: true,
            },
          },
        },
      },

      scoreSheetGroups: true,
    },
  });

  return event;
}
