import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { parseCSV } from "@/utils/csv";
import prisma from "@/lib/prisma";
import { findEvent } from "@/lib/event";
import { getDateFromUdiscTime } from "@/utils/dateUtils";
import { equal } from "assert";

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

type ErrorResponse = { error: string };
type SuccessResponse = { scoreSheetGroupId: number; scoreSheetLink: string };
type ProcessScoreResult = SuccessResponse | ErrorResponse;

async function buildRoundData(file: Blob): Promise<{ scoreData?: ScoreData; error?: string }> {
  try {
    const results = await parseCSV(file);
    if (results.length === 0) return { error: "CSV file is empty" };

    const firstRow = results[0];
    const expectedKeys = ["PlayerName", "CourseName", "LayoutName", "StartDate", "EndDate", "Total"];
    for (const key of expectedKeys) {
      if (!firstRow.hasOwnProperty(key)) return { error: "Unable to parse CSV" };
    }

    const dataString = results.map((row) => JSON.stringify(row)).join("|");
    const hash = crypto.createHash("sha256").update(dataString).digest("hex");
    const scoreData: ScoreData = {
      hash,
      course: firstRow["CourseName"],
      layout: firstRow["LayoutName"],
      time: new Date(getDateFromUdiscTime(firstRow["StartDate"])),
      results: results.slice(1),
    };

    return { scoreData };
  } catch {
    return { error: "Error processing the CSV file" };
  }
}

async function processAndSaveScores(scoreData: ScoreData): Promise<ProcessScoreResult> {
  const { hash, results, course, layout, time } = scoreData;
  const { event, error: eventError } = await findEvent(time, course, layout);

  if (!event || eventError) return { error: eventError };

  const existingScoreSheetGroup = await prisma.scoreSheetGroup.findUnique({
    where: { roundHash: hash },
  });

  if (existingScoreSheetGroup) {
    return {
      scoreSheetGroupId: existingScoreSheetGroup.id,
      scoreSheetLink: `/scores/${existingScoreSheetGroup.id}`,
    };
  }

  const newScoreSheetGroup = await prisma.scoreSheetGroup.create({
    data: { roundHash: hash, eventId: event.id },
  });

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
        scores: { create: scores },
      },
    });
  }

  return {
    scoreSheetGroupId: newScoreSheetGroup.id,
    scoreSheetLink: `/scores/${newScoreSheetGroup.id}`,
  };
}

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ message: "Only multipart/form/data is supported" }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const redirect = formData.get("redirect") ?? "true";

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "File not found or invalid" }, { status: 400 });
    }

    if (file.type !== "text/csv" && file.type !== "text/comma-separated-values") {
      return NextResponse.json({ message: "Only CSV files are allowed", uploadedType: file.type }, { status: 400 });
    }

    const { scoreData, error: csvError } = await buildRoundData(file);
    if (csvError || !scoreData) return NextResponse.json({ message: csvError }, { status: 400 });

    const processedOutput = await processAndSaveScores(scoreData);
    if ("error" in processedOutput) {
      return NextResponse.json({ message: processedOutput.error }, { status: 400 });
    }

    if (redirect === "true") {
      const baseUrl = new URL(req.url);
      const newUrl = new URL(processedOutput.scoreSheetLink, baseUrl.origin);
      return NextResponse.redirect(newUrl.toString(), 303); // Use 303 See Other for redirection with GET
    }

    return NextResponse.json(
      {
        message: "Got it!",
        ...processedOutput,
        redirectUrl: new URL(processedOutput.scoreSheetLink, new URL(req.url).origin).toString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const formData = await req.json();
  const playerMap = formData["playerMap"];
  const scoreSheetGroupId = formData["scoreSheetGroupId"];

  if (!scoreSheetGroupId || !playerMap || Object.keys(playerMap).length < 2) {
    return NextResponse.json({ error: "Oops! Something went wrong!!!" }, { status: 400 });
  }

  for (const scoreSheetId of Object.keys(playerMap)) {
    await prisma.scoreSheet.update({
      where: {
        id: parseInt(scoreSheetId),
      },
      data: {
        userId: playerMap[scoreSheetId],
      },
    });
  }

  const scoreSheetGroup = await prisma.scoreSheetGroup.update({
    where: {
      id: parseInt(scoreSheetGroupId),
    },
    data: {
      submitted: true,
    },
  });

  // Get the current URL from the request object
  const currentUrl = req.nextUrl.clone();
  currentUrl.pathname = `/events/${scoreSheetGroup.eventId}`;

  // Use the current URL in the redirect
  return NextResponse.json({ redirect: currentUrl.toString() }, { status: 200 });
}
