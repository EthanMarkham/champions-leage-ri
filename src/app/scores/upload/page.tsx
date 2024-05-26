"use client";

import { FormEvent, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Card from "@/components/ui/Card";
import SpinnerCover from "@/components/ui/SpinnerCover";

const FileUploader = dynamic(() => import("@/components/inputs/FileUploader"), { ssr: false });
const UserMultiSelect = dynamic(() => import("@/components/multiselect/UserMultiSelect"), { ssr: false });

const messageTypeToClassName = (type: "success" | "error" | "warning") => {
  switch (type) {
    case "error":
      return "text-red-500";
    case "success":
      return "text-green-500";
    case "warning":
      return "text-yellow-500";
  }
};

export default function ScoreCardUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [players, setPlayers] = useState<{ name: string; id: number }[]>([]);
  const [message, setMessage] = useState<[string, "success" | "error" | "warning"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!file) {
      setMessage(["Please select a file to upload.", "error"]);
      setIsLoading(false);
      return;
    }

    if (players.length < 2) {
      setMessage(["Please add at least 2 players.", "error"]);
      setIsLoading(false);
      return;
    }

    if (file.type !== "text/csv") {
      setMessage(["Only CSV files are allowed.", "error"]);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("players", JSON.stringify(players));

    try {
      const res = await fetch("/api/scorecard", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage([data.errors.map((e: any) => e.message).join(" "), "error"]);
      } else {
        router.push(`${data.scoreSheetGroupId}`);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setMessage(["Failed to upload the file. Please try again.", "error"]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="sm:max-w-lg w-full p-10 bg-white rounded-xl relative mx-auto">
      <SpinnerCover show={isLoading} />

      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold text-gray-900">Submit your ScoreCard!</h2>
        <p className="text-sm text-gray-400">Udisc &#x27A1; Round &#x27A1; Export CSV</p>
        {message && <p className={twMerge(messageTypeToClassName(message[1]))}>{message[0]}</p>}
      </div>

      <form className="mt-2 space-y-3" onSubmit={handleUpload}>
        <Suspense fallback={"loading..."}>
          <div className="mb-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Players</label>
            <UserMultiSelect
              containerProps={{ className: "mb-2" }}
              onSelectionChange={(selectedItems) => setPlayers(selectedItems)}
              placeHolderText="Search For Players..."
            />
          </div>
          <FileUploader onFileChange={setFile}>
            <div className="text-gray-500 pointer-none relative w-full h-full flex flex-col items-center justify-center">
              <p className="text-sm text-gray-300 absolute top-0 right-0 hidden md:block">File type: CSV only</p>
              <p className="text-sm hidden md:block">Drag and drop your CSV here</p>
              <p className="hidden md:block">
                Or <span className="text-blue-600 hover:underline">select a file</span> from your computer
              </p>
              <p className="text-sm block md:hidden">Select your CSV</p>
            </div>
          </FileUploader>
        </Suspense>

        <div>
          <button
            type="submit"
            className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </Card>
  );
}
