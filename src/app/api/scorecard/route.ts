import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { processScoreData, ScoreData } from "@/lib/scorecard";
import { getDateFromUdiscTime } from "@/lib/date";
import { parseCSV } from "@/lib/csv";

// Validate form data
async function parseFormData(
  formData: FormData
): Promise<{ file?: Blob; players?: { id: number; name: string }[]; error?: string }> {
  const file = formData.get("file");
  const playersParam = formData.get("players");

  if (!file || !(file instanceof Blob)) {
    return { error: "File not found or invalid" };
  }

  if (file.type !== "text/csv") {
    return { error: "Only CSV files are allowed" };
  }

  if (!playersParam) {
    return { error: "Players parameter is missing" };
  }

  const players = JSON.parse(playersParam.toString()) as { id: number; name: string }[];
  if (!Array.isArray(players) || !players.every((player) => player.name && player.id)) {
    return { error: "Players parameter invalid" };
  }

  return { file, players };
}

// Build round data from CSV file and players
async function buildRoundData(
  file: Blob,
  players: { id: number; name: string }[]
): Promise<{ scoreData?: ScoreData; error?: string }> {
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
      users: players,
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

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ message: "Only multipart/form-data is supported" }, { status: 400 });
    }

    const formData = await req.formData();
    const { file, players, error: validationError } = await parseFormData(formData);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const { scoreData, error: csvError } = await buildRoundData(file!, players!);

    if (csvError) {
      return NextResponse.json({ message: csvError }, { status: 400 });
    }

    const output = await processScoreData(scoreData!);

    if (output.errors.length === 0) {
      return NextResponse.json({ message: "Got it!", ...output }, { status: 200 });
    }
    return NextResponse.json({ message: "Some issues occurred!", ...output }, { status: 422 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
