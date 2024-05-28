import prisma from "@/lib/prisma";
import { roundTo } from "./math";

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
              image: true,
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

export async function getEventById(id: number) {
  const event = await prisma.event.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
    include: {
      layout: {
        include: {
          holes: true,
          course: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return event;
}

export async function getDetailedEventList() {
  const events = await prisma.event.findMany({
    include: {
      scoreSheetGroups: {
        include: {
          scoreSheets: {
            include: {
              scores: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        where: {
          submitted: true,
        }
      },
      layout: {
        include: {
          course: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  const detailedEvents = events.map((event) => {
    let totalScoreSheets = 0;
    let bestScore: number | null = null;
    let bestScoreUsername: string | null = null;
    let totalScoresSum = 0;
    let totalScoresCount = 0;

    event.scoreSheetGroups.forEach((scoreSheetGroup) => {
      scoreSheetGroup.scoreSheets.forEach((scoreSheet) => {
        totalScoreSheets += 1;
        const scoreSheetTotalScore = scoreSheet.scores.reduce((sum, score) => sum + score.score, 0);

        if (bestScore === null || scoreSheetTotalScore < bestScore) {
          bestScore = scoreSheetTotalScore;
          bestScoreUsername = scoreSheet.user?.name || scoreSheet.playerName;
        }

        totalScoresSum += scoreSheetTotalScore;
        totalScoresCount += 1;
      });
    });

    const averageScore = totalScoresCount > 0 ? roundTo(totalScoresSum / totalScoresCount, 2) : null;

    return {
      ...event,
      totalScoreSheets,
      bestScore,
      averageScore,
      bestScoreUsername,
    };
  });
  return detailedEvents;
}
