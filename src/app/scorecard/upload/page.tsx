"use client";

import { FormEvent, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";

const FileUploader = dynamic(() => import("@/components/inputs/FileUploader"), { ssr: false });
const UserMultiSelect = dynamic(() => import("@/components/multiselect/UserMultiSelect"), { ssr: false });

export default function ScoreCardUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [players, setPlayers] = useState<{ name: string; id: number }[] | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (!players || players.length < 2) {
      toast.error("Please add at least 2 players.");
      return;
    }

    if (file.type !== "text/csv") {
      toast.error("Only CSV files are allowed.");
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

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      setMessage(data.message);
    } catch (error) {
      console.error("Error during file upload:", error);
      setMessage("Failed to upload the file. Please try again.");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
      }}
    >
      <Toaster
        toastOptions={{
          className: "bg-white border border-gray-200 text-sm tracking-tight text-gray-800 shadow-lg rounded-lg p-4",
          duration: 4000,
          position: "top-center",
        }}
      />

      <div className="absolute bg-black opacity-60 inset-0 z-0" />

      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 relative">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">Submit your ScoreCard!</h2>
          <p className="mt-2 text-sm text-gray-400">Udisc &#x27A1; Round &#x27A1; Export CSV</p>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleUpload}>
          <Suspense fallback={<div>Loading...</div>}>
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
                <p className="text-sm text-gray-300 absolute top-0 right-0">File type: CSV only</p>
                <p className="text-sm block">Drag and drop your CSV here</p>
                <p>
                  Or <span className="text-blue-600 hover:underline ">select a file</span> from your computer
                </p>
              </div>
            </FileUploader>
          </Suspense>

          <div>
            <button
              type="submit"
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
