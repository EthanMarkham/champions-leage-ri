"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import SpinnerPage from "@/components/ui/SpinnerPage";
import { useSpring, animated } from "@react-spring/web";

export default function ScoreCardUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!file) {
      setMessage("Please select a file to upload.");
      setIsLoading(false);
      return;
    }

    if (file.type !== "text/csv") {
      setMessage("Only CSV files are allowed.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("redirect", "false");

    try {
      const res = await fetch("/api/scorecard", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.errors.map((e: any) => e.message).join(" "));
      } else {
        router.push(`${data.scoreSheetGroupId}`);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setMessage("Failed to upload the file. Please try again.");
      setIsLoading(false);
    }
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  const springProps = useSpring({
    opacity: isLoading ? 0 : 1,
    transform: isLoading ? "scale(0.9)" : "scale(1)",
    config: { duration: 300 },
  });

  return (
    <div className="flex flex-1 items-center justify-center">
      {message && (
        <div className="alert alert-error absolute top-0">
          <div className="flex-1">
            <label>{message}</label>
          </div>
        </div>
      )}

      {isLoading && <SpinnerPage />}

      {!isLoading && (
        <animated.div style={springProps} className="card card-bordered bg-base-200 p-4 max-w-3xl overflow-hidden">
          <form className="card-body" onSubmit={handleUpload}>
            <hgroup className="card-title justify-center items-center flex-col">
              <h1 className="text-2xl">Submit your ScoreCard!</h1>
              <h2 className="text-xs font-light">Udisc &#x27A1; Round &#x27A1; Export CSV</h2>
            </hgroup>

            <div>
              <div className="label">
                <span className="label-text">CSV Upload</span>
              </div>
              <input
                type="file"
                id="file-upload"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="btn btn-outline mt-10" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </animated.div>
      )}
    </div>
  );
}
