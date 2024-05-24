"use client";

import { useState, ChangeEvent, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  children?: ReactNode;
}

export default function FileUploader({ onFileChange, children }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      onFileChange(droppedFile);
      e.dataTransfer.clearData();
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileChange(null);
  };

  return (
    <div
      className={`relative flex items-center justify-center w-full border-4 border-dashed ${
        isDragging ? "border-blue-500" : "border-gray-300"
      } rounded-lg`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="flex flex-col w-full h-60 text-center cursor-pointer group">
        <div className="relative flex flex-col items-center justify-center h-full w-full">
          {file ? (
            <>
              <p className="text-green-600 mb-2 truncate w-[80%] text-center">{file.name}</p>
              <button
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 bg-red-300 text-white rounded-full hover:bg-red-400"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </>
          ) : (
            children || (
              <>
                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                  <img
                    className="has-mask h-36 object-center"
                    src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                    alt="Upload illustration"
                  />
                </div>
                <p className="text-gray-500 pointer-none">
                  <span className="text-sm">Drag and drop</span> files here <br /> or{" "}
                  <span className="text-blue-600 hover:underline">select a file</span> from your computer
                </p>
              </>
            )
          )}
        </div>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
}
