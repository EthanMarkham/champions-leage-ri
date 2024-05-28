import prisma from "@/lib/prisma";
import { Score, ScoreSheet, User } from "@prisma/client";
import { cache } from "react";

interface UserScores {
  user: User;
  scoreSheets: (ScoreSheet & { scores: Score[]; total: number })[];
}

export const getScoreSheetDetails = cache(async (id: number) => {
  return await prisma.scoreSheetGroup.findUnique({
    where: { id },
    include: {
      event: {
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
      },
      scoreSheets: {
        include: {
          scores: true,
        },
      },
      payments: true,
    },
  });
});

export function getTotalStrokes(scrores: Score[]) {
  return scrores.reduce((prev, cur) => prev + cur.score, 0);
}

export const getScoresByEventId = cache(async (id: number) => {
  const scoreGroups = await prisma.scoreSheetGroup.findMany({
    include: {
      scoreSheets: {
        include: {
          scores: true,
        },
      },
    },
    where: {
      eventId: {
        equals: id,
      },
    },
  });

  return scoreGroups;
});

export const getUserScoresByEventId = cache(async (id: number) => {
  const scoreSheets = await prisma.scoreSheet.findMany({
    include: {
      user: true,
      scores: true,
    },
    where: {
      scoreSheetGroup: {
        eventId: id,
        submitted: true,
      },
    },
  });

  // Grouping scoreSheets by user
  const scoresByUser = scoreSheets.reduce<Record<number, UserScores>>((acc, scoreSheet) => {
    if (!scoreSheet.user) return acc; // Skip if there's no user

    const userId = scoreSheet.user.id;
    if (!acc[userId]) {
      acc[userId] = {
        user: scoreSheet.user,
        scoreSheets: [],
      };
    }

    acc[userId].scoreSheets.push({
      ...scoreSheet,
      total: scoreSheet.scores.reduce((prev, cur) => prev + cur.score, 0),
    });

    return acc;
  }, {});

  const usersScores = Object.values(scoresByUser)
    .map((userScore) => ({
      ...userScore,
      average: userScore.scoreSheets.reduce((prev, cur) => prev + cur.total, 0) / userScore.scoreSheets.length,
      best: userScore.scoreSheets.reduce(
        (prev, cur) => (prev < cur.total ? prev : cur.total),
        userScore.scoreSheets[0].total
      ),
    }))
    .sort((a, b) => (a.best > b.best ? 1 : -1));

  return usersScores;
});
