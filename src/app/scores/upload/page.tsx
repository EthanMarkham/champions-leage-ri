"use client";

import { FormEvent, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import SpinnerCover from "@/components/ui/SpinnerCover";
import Header from "@/components/ui/Header";
import { UserMessageProps } from "@/components/ui/Message";
import PageWrapper from "@/components/ui/PageWrapper";
import { Fieldset, Field, Label, Description, Input, Button } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { UserSearchModel } from "@/lib/users";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const PlayerCombobox = dynamic(() => import("@/components/scoreForm/PlayerCombobox"), { ssr: false });

export default function ScoreCardUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<UserMessageProps>();
  const router = useRouter();
  const [selectedPeople, setSelectedPeople] = useState<UserSearchModel[]>([]);
  const [fileName, setFileName] = useState("No file chosen");
  const [isLoading, setIsLoading] = useState(false);

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

    if (selectedPeople.length < 2) {
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
    formData.append("players", JSON.stringify(selectedPeople));

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

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
    setFileName(file ? file.name : "No file chosen");
  };

  return (
    <PageWrapper className="h-full">
      <Card className="max-w-3xl shadow w-full p-10 bg-white rounded-xl relative mx-auto overflow-visible">
        <SpinnerCover show={isLoading} />

        <Header message={message} text="Submit your ScoreCard!" subText="Udisc &#x27A1; Round &#x27A1; Export CSV" />
        <Suspense
          fallback={
            <SpinnerCover
              show={true}
              className="w-full h-32 relative"
              spinnerProps={{ className: "border-black/50 border-2 border-t-transparent h-8 w-8" }}
            />
          }
        >
          <Fieldset as="form" className="mt-2 space-y-8 relative overflow-visible w-full" onSubmit={handleUpload}>
            <Field className="relative">
              <Label className="block text-gray-700 mb-2">Add Players</Label>
              <PlayerCombobox selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} />
            </Field>
            <Field className="w-full">
              <Label className="text-sm font-medium text-gray-700" htmlFor="file-upload">
                CSV Upload
              </Label>
              <Description className="text-xs text-gray-500 mb-2">Settings &#x2192; Export to CSV</Description>
              <div className="relative">
                <Input
                  type="file"
                  id="file-upload"
                  className={twMerge("absolute inset-0 w-full h-full opacity-0 cursor-pointer")}
                  onChange={handleFileChange}
                />
                <div
                  className={twMerge(
                    "flex gap-1 items-center justify-between h-9 w-full rounded-md bg-white px-3 py-1 text-sm transition-colors",
                    "border border-gray-400 rounded-lg shadow-sm",
                    "text-gray-700 font-medium placeholder-gray-400",
                    "focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "hover:bg-blue-100 transition-color duration-300"
                  )}
                >
                  <span className="truncate">{fileName}</span>
                  <ArrowUpTrayIcon className="w-[20px] text-blue-500 hover:text-blue-900 transition-colors duration-300 ease-in-out" />
                </div>
              </div>
            </Field>
            <Button
              type="submit"
              className={twMerge(
                "bg-blue-600 text-white p-2 px-4 text-md rounded-lg tracking-wide font-semibold shadow-lg cursor-pointer block mx-auto mt-10",
                "focus:shadow-outline hover:bg-blue-700 focus:outline-none",
                "transition ease-in duration-300"
              )}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Fieldset>
        </Suspense>
      </Card>
    </PageWrapper>
  );
}
