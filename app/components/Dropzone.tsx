"use client"

import React, { useRef, useState } from "react";
import { CheckCircle, X } from "lucide-react";
interface DropzoneProps {
  fileName: string;
  onFileUpload: (file: File) => void;
  onClearFile: () => void;
}

export default function Dropzone({
  fileName,
  onFileUpload,
  onClearFile,
}: DropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/pdf") onFileUpload(file);
  };

  if (fileName) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#fafaf8] border-[1.5px] border-[#e8e5e0] rounded-xl">
        <div className="w-8 h-8 rounded-lg bg-[#C8102E] flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 1h6.5l3.5 3.5v9H2.5V1z"
              stroke="white"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-[#111] overflow-hidden text-ellipsis whitespace-nowrap">
            {fileName}
          </p>
          <div className="flex items-center gap-1 mt-px">
            <CheckCircle className="w-3.5 h-3.5 text-[#22c55e]" />
            <p className="text-[11px] text-[#22c55e]">Ready to analyse</p>
          </div>
        </div>
        <button
          onClick={onClearFile}
          className="flex items-center justify-center text-[#ccc] hover:text-[#999] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => fileRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      className={`rounded-[14px] py-8 px-5 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-150 border-2 border-dashed ${
        dragOver ? "border-[#C8102E] bg-[#fef8f8]" : "border-[#ddd9d2] bg-[#fafaf8]"
      }`}
    >
      <div className="w-10 h-10 rounded-[10px] bg-[#f0ece6] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 2h7l4 4v10H4V2z"
            stroke="#aaa"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M11 2v4h4" stroke="#aaa" strokeWidth="1.3" />
          <path
            d="M6 9h6M6 12h4"
            stroke="#aaa"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-[13px] font-medium text-[#444]">Drop PDF here</p>
        <p className="text-[11px] text-[#bbb] mt-0.75">or click to browse</p>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFileUpload(f);
        }}
      />
    </div>
  );
}
