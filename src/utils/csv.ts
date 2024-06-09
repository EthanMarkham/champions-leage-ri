import { Readable } from "stream";
import csv from "csv-parser";

export async function parseCSV(file: Blob): Promise<any[]> {
  const results: any[] = [];
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

  const readableStream = new Readable();
  readableStream.push(csvData);
  readableStream.push(null); // signal the end of the stream

  return new Promise((resolve, reject) => {
    readableStream
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}
