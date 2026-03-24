"use client";

import React from "react";
import InputTabs, { Tab } from "./InputTabs";
import Dropzone from "./Dropzone";


interface LeftPanelProps {
  tab: Tab;
  onTabChange: (t: Tab) => void;
  text: string;
  onTextChange: (val: string) => void;
  wordCount: number;
  fileName: string;
  onFileUpload: (f: File) => void;
  onClearFile: () => void;
  isLoading: boolean;
  error: string | null;
  onAnalyse: () => void;
}

export default function LeftPanel({
  tab,
  onTabChange,
  text,
  onTextChange,
  wordCount,
  fileName,
  onFileUpload,
  onClearFile,
  isLoading,
  error,
  onAnalyse,
}: LeftPanelProps) {
  return (
    <div className="w-70 shrink-0 bg-white border-r border-[#e8e5e0] flex flex-col">
      <div className="px-5 pt-4.5 pb-3.5 border-b border-[#f0ece6]">
        <p className="text-[13px] font-semibold text-[#111] mb-0.5">Input</p>
        <p className="text-[11px] text-[#aaa]">Paste text or upload a PDF</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3.5">
        <InputTabs tab={tab} onTabChange={onTabChange} />

        {tab === "paste" && (
          <div className="flex flex-col gap-1.5">
            <textarea
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Paste your assignment brief here..."
              className="w-full min-h-55 px-3.5 py-3 text-[12px] leading-[1.7] text-[#333] bg-[#fafaf8] border-[1.5px] border-[#e8e5e0] rounded-xl outline-none resize-none font-sans"
            />
            <p className="text-[11px] text-[#ccc] text-right">
              {wordCount} words
            </p>
          </div>
        )}

        {tab === "upload" && (
          <Dropzone
            fileName={fileName}
            onFileUpload={onFileUpload}
            onClearFile={onClearFile}
          />
        )}
        {error && (
          <div className="px-3 py-2.5 bg-[#fef2f2] border border-[#fecaca] rounded-[10px]">
            <p className="text-[12px] text-[#dc2626]">{error}</p>
          </div>
        )}
      </div>

      <div className="px-5 py-3.5 border-t border-[#f0ece6]">
        <button
          onClick={onAnalyse}
          disabled={isLoading || !text.trim()}
          className={`w-full py-2.75 text-[13px] font-semibold text-white rounded-[10px] tracking-[-0.01em] transition-colors ${
            isLoading || !text.trim()
              ? "bg-[#f0a0a0] cursor-not-allowed"
              : "bg-[#C8102E] cursor-pointer"
          }`}
        >
          {isLoading
            ? "Analysing..."
            : text.trim()
              ? "Re-analyse brief"
              : "Analyse brief now"}
        </button>
      </div>
    </div>
  );
}
