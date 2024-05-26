"use client";

import { FormEvent, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Card from "@/components/ui/Card";
import SpinnerCover from "@/components/ui/SpinnerCover";
import Header from "@/components/ui/Header";
import { UserMessageProps } from "@/components/ui/Message";
import Button from "@/components/inputs/Button";
import PageWrapper from "@/components/ui/PageWrapper";

const FileUploader = dynamic(() => import("@/components/inputs/FileUploader"), { ssr: false });
const UserMultiSelect = dynamic(() => import("@/components/multiselect/UserMultiSelect"), { ssr: false });

export default function ScoreCardUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [players, setPlayers] = useState<{ name: string; id: number }[]>([]);
  const [message, setMessage] = useState<UserMessageProps>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!file) {
      setMessage({
        message: "Please select a file to upload.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    if (players.length < 2) {
      setMessage({
        message: "Please add at least 2 players.",
        type: "error",
      });
      setIsLoading(false);
      return;
    }

    if (file.type !== "text/csv") {
      setMessage({
        message: "Only CSV files are allowed.",
        type: "error",
      });
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
        setMessage({
          message: data.errors.map((e: any) => e.message).join(" "),
          type: "error",
        });
      } else {
        router.push(`${data.scoreSheetGroupId}`);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setMessage({
        message: "Failed to upload the file. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Card className="sm:max-w-lg w-full p-10 bg-white rounded-xl relative mx-auto">
        <SpinnerCover show={isLoading} />

        <Header message={message} text="Submit your ScoreCard!" subText="Udisc &#x27A1; Round &#x27A1; Export CSV" />

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

          <Button
            type="submit"
            className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </Card>
    </PageWrapper>
  );
}
