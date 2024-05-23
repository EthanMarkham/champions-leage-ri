import prisma from "@/lib/prisma";
import { findEvent } from "./event";
import { Score } from "@prisma/client";

interface ScoreResult {
  PlayerName: string;
  CourseName: string;
  LayoutName: string;
  StartDate: string;
  EndDate: string;
  Total: string;
  "+/-": string;
  RoundRating: string;
  [key: string]: string; // Index signature to allow dynamic fields like Hole1, Hole2, etc.
}

export interface ScoreData {
  hash: string;
  users: any;
  course: string;
  layout: string;
  time: Date;
  results: ScoreResult[];
}

interface GeneralError {
  message: string;
  hash?: string;
}

interface MultipleUserError {
  PlayerName: string;
  users: { id: number; name: string; results: Omit<ScoreResult, "PlayerName" | "Total"> }[];
}

interface Output {
  scoreSheetGroupId: number | null;
  errors: GeneralError[];
  multipleUserErrors: MultipleUserError[];
}

export async function processScoreData(data: ScoreData): Promise<Output> {
  const { hash, results, course, layout, time, users } = data;

  const output: Output = {
    scoreSheetGroupId: null,
    errors: [],
    multipleUserErrors: [],
  };

  const { event, error: eventError } = await findEvent(time, course, layout);
  if (event === null || eventError !== null) {
    output.errors.push({ message: eventError });
    return output;
  }

  // Check if the round hash already exists
  const existingScoreSheetGroup = await prisma.scoreSheetGroup.findUnique({
    where: { roundHash: hash },
  });

  if (existingScoreSheetGroup) {
    output.errors.push({ message: "Round hash already exists", hash });
    return output;
  }

  // Prepare the new ScoreSheetGroup
  const newScoreSheetGroup = await prisma.scoreSheetGroup.create({
    data: {
      roundHash: hash,
      eventId: event!.id, // Use the found event ID
    },
  });

  output.scoreSheetGroupId = newScoreSheetGroup.id;

  for (const result of results) {
    const { PlayerName, Total, ...holes } = result;

    // Look for matching player from posted players in.
    let userId: number | null = null;
    const player = findMatchingUser(PlayerName, users);
    if (player) {
      userId = player.id;
    } else {
      // Check if the user exists using a case-insensitive partial match
      const potentialUsers = await prisma.user.findMany({
        where: {
          name: {
            contains: PlayerName,
            mode: "insensitive",
          },
        },
      });

      if (potentialUsers.length === 1) {
        userId = potentialUsers[0].id;
      } else if (users.length > 1) {
        // Handle multiple users found
        output.multipleUserErrors.push({
          PlayerName,
          users: potentialUsers.map((user) => ({ id: user.id, name: user.name, results: holes })),
        });
        continue;
      }
    }

    // Prepare scores for each hole
    const scores = Object.entries(holes)
      .filter(([key]) => key.startsWith("Hole"))
      .map(([holeKey, score]) => ({
        holeNumber: parseInt(holeKey.replace("Hole", ""), 10),
        score: parseInt(score, 10),
      }));

    // Create a new ScoreSheet with nested scores
    await prisma.scoreSheet.create({
      data: {
        scoreSheetGroupId: newScoreSheetGroup.id,
        userId,
        playerName: PlayerName,
        scores: {
          create: scores,
        },
      },
    });
  }

  return output;
}

export async function getScoreSheetDetails(id: number) {
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
}

export function findMatchingUser(nameInput: string, users: { name: string; id: number }[]) {
  // Function to normalize user names
  const normalizeName = (name: string) => name.trim().toLowerCase();

  // Normalize the input for comparison
  const normalizedInput = normalizeName(nameInput);

  // Function to compare names
  const isMatch = (userName: string, input: string) => {
    // Split names into parts for comparison
    const userParts = userName.split(" ");
    const inputParts = input.split(" ");

    // Check for exact match or partial match (first name, last name, or initial with last name)
    if (userName === input || userParts.some((part) => inputParts.includes(part))) {
      return true;
    }

    // Check for first initial with last name
    if (inputParts.length === 2 && userParts.length === 2) {
      const [inputFirstInitial, inputLastName] = inputParts;
      const [userFirstName, userLastName] = userParts;
      if (inputFirstInitial.charAt(0) === userFirstName.charAt(0) && inputLastName === userLastName) {
        return true;
      }
    }

    return false;
  };

  // Find the best match
  for (const user of users) {
    if (isMatch(normalizeName(user.name), normalizedInput)) {
      return user;
    }
  }

  // Return null if no match is found
  return null;
}

export function getTotalStrokes(scrores: Score[]) {
  return scrores.reduce((prev, cur) => prev + cur.score, 0);
}
