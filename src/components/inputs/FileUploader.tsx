"use client";

import { useState, ChangeEvent, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface FileUploaderProps {
  onFileChange?: (file: File | null) => void;
  children?: ReactNode;
}

export default function FileUploader({ onFileChange, children }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (onFileChange) {
        onFileChange(selectedFile);
      }
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
      if (onFileChange) {
        onFileChange(droppedFile);
      }
      e.dataTransfer.clearData();
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (onFileChange) {
      onFileChange(null);
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center w-full border-2 border-dashed ${
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
            children
          )}
        </div>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
}
