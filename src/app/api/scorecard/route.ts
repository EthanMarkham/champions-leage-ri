import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import csv from "csv-parser";
import crypto from "crypto";
import { processScoreData, ScoreData } from "@/lib/scorecard";
import { getDateFromUdiscTime } from "@/utils/date";

export async function POST(req: NextRequest) {
  const results: any[] = [];

  if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json({ message: "Only multipart/form-data is supported" }, { status: 400 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const playersParam = formData.get("players");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ message: "File not found or invalid" }, { status: 400 });
  }

  if (file.type !== "text/csv") {
    return NextResponse.json({ message: "Only CSV files are allowed" }, { status: 400 });
  }

  if (!playersParam) {
    return NextResponse.json({ message: "Players parameter is missing" }, { status: 400 });
  }

  const players = JSON.parse(playersParam.toString()) as { id: number; name: string }[];
  if (!Array.isArray(players) || !players.every((user) => user.name && user.id)) {
    return NextResponse.json({ message: "Players parameter invalid" }, { status: 400 });
  }

  const stream = file.stream();
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  let csvData = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    csvData += decoder.decode(value, { stream: true });
  }
  csvData += decoder.decode(); // finalize the decoding

  // Compute the hash of the file's contents
  const hash = crypto.createHash("sha256").update(csvData).digest("hex");

  // Create a readable stream from the CSV data string
  const readableStream = new Readable();
  readableStream.push(csvData);
  readableStream.push(null); // signal the end of the stream

  return NextResponse.json({ message: "Chaaaa. Need to do more logic" }, { status: 200 });

  return new Promise((resolve, reject) => {
    readableStream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        if (results.length === 0) {
          resolve(NextResponse.json({ error: "CSV file is empty" }, { status: 400 }));
          return;
        }

        if (!results.length) {
          resolve(NextResponse.json({ error: "Unable to parse CSV" }, { status: 400 }));
          return;
        }

        const firstRow = results[0];
        const expectedKeys = ["PlayerName", "CourseName", "LayoutName", "StartDate", "EndDate", "Total"];
        for (let expectedKey of expectedKeys) {
          if (!firstRow.hasOwnProperty(expectedKey)) {
            resolve(NextResponse.json({ error: "Unable to parse CSV" }, { status: 400 }));
            return;
          }
        }

        const scoreData: ScoreData = {
          hash,
          users: players,
          course: firstRow["CourseName"],
          layout: firstRow["LayoutName"],
          time: new Date(getDateFromUdiscTime(firstRow["StartDate"])),
          results: results.slice(1),
        };

        // Incorporate users into the processing logic if needed
        console.log("Users:", players);

        const output = await processScoreData(scoreData);
        resolve(
          NextResponse.json(
            {
              message: output.errors.length > 0 ? "An unexpected error has occurred" : "File processed successfully",
              ...output,
            },
            { status: 200 }
          )
        );
      })
      .on("error", (error) => {
        reject(NextResponse.json({ message: "Error processing the CSV file", error }, { status: 500 }));
      });
  });
}
