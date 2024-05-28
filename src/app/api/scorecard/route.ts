import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDateFromUdiscTime } from "@/lib/date";
import { parseCSV } from "@/lib/csv";
import prisma from "@/lib/prisma";
import { findEvent } from "@/lib/event";
import { findMatchingUser } from "@/lib/users";

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

interface ScoreData {
  hash: string;
  course: string;
  layout: string;
  time: Date;
  results: ScoreResult[];
}

interface GeneralError {
  message: string;
  hash?: string;
}

interface Output {
  scoreSheetGroupId: number | null;
  errors: GeneralError[];
  scoreSheetLink?: string;
}

// Function to build round data from CSV file and players
async function buildRoundData(file: Blob) {
  try {
    const results = await parseCSV(file);

    if (results.length === 0) {
      return { error: "CSV file is empty" };
    }

    const firstRow = results[0];
    const expectedKeys = ["PlayerName", "CourseName", "LayoutName", "StartDate", "EndDate", "Total"];
    for (const key of expectedKeys) {
      if (!firstRow.hasOwnProperty(key)) {
        return { error: "Unable to parse CSV" };
      }
    }

    const hash = crypto.createHash("sha256").update(results.join("\n")).digest("hex");
    const scoreData: ScoreData = {
      hash,
      course: firstRow["CourseName"],
      layout: firstRow["LayoutName"],
      time: new Date(getDateFromUdiscTime(firstRow["StartDate"])),
      results: results.slice(1),
    };

    return { scoreData };
  } catch (error) {
    return { error: "Error processing the CSV file" };
  }
}

// Function to process and save scores to the database
async function processAndSaveScores(scoreData: ScoreData, output: Output) {
  const { hash, results, course, layout, time } = scoreData;

  const { event, error: eventError } = await findEvent(time, course, layout);
  if (!event || eventError) {
    output.errors.push({ message: eventError });
    return output;
  }

  const existingScoreSheetGroup = await prisma.scoreSheetGroup.findUnique({
    where: { roundHash: hash },
  });

  // Info: Lie and just redirect them to the existing scoresheet group
  if (existingScoreSheetGroup) {
    output.scoreSheetGroupId = existingScoreSheetGroup.id;
    output.scoreSheetLink = `/scores/${existingScoreSheetGroup.id}`;
    return output;
  }

  const newScoreSheetGroup = await prisma.scoreSheetGroup.create({
    data: {
      roundHash: hash,
      eventId: event.id,
    },
  });

  output.scoreSheetGroupId = newScoreSheetGroup.id;
  output.scoreSheetLink = `/scores/${newScoreSheetGroup.id}`;

  for (const result of results) {
    const { PlayerName, Total, ...holes } = result;

    const scores = Object.entries(holes)
      .filter(([key]) => key.startsWith("Hole"))
      .map(([holeKey, score]) => ({
        holeNumber: parseInt(holeKey.replace("Hole", ""), 10),
        score: parseInt(score, 10),
      }));

    await prisma.scoreSheet.create({
      data: {
        scoreSheetGroupId: newScoreSheetGroup.id,
        userId: null,
        playerName: PlayerName,
        scores: {
          create: scores,
        },
      },
    });
  }

  return output;
}

// POST request handler
export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ message: "Only multipart/form-data is supported" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const redirect = formData.get("redirect");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "File not found or invalid" }, { status: 400 });
    }

    if (file.type !== "text/csv") {
      return NextResponse.json({ message: "Only CSV files are allowed" }, { status: 400 });
    }

    const { scoreData, error: csvError } = await buildRoundData(file);

    if (csvError || !scoreData) {
      return NextResponse.json({ message: csvError }, { status: 400 });
    }

    const processedOutput = await processAndSaveScores(scoreData, {
      scoreSheetGroupId: null,
      errors: [],
    });

    if (processedOutput.errors.length === 0) {
      const responsePayload: any = {
        message: "Got it!",
        ...processedOutput,
        redirectUrl: processedOutput.scoreSheetLink,
      };
      if (redirect === "true") {
        return NextResponse.redirect(new URL(processedOutput.scoreSheetLink!, req.url));
      } else {
        return NextResponse.json(responsePayload, { status: 200 });
      }
    }
    return NextResponse.json({ message: "Some issues occurred!", ...processedOutput }, { status: 422 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
