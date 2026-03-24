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
  result: any | null;
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
  result,
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
        {result && (
          <div className="px-3.5 py-3 bg-[#fafaf8] border-[1.5px] border-[#e8e5e0] rounded-xl">
            <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.06em] mb-1.25">
              Detected module
            </p>
            <p className="text-[12px] font-semibold text-[#111] leading-[1.4]">
              {result.module}
            </p>
            {result.author !== "Not specified" && (
              <p className="text-[11px] text-[#999] mt-0.75">
                {result.author}
              </p>
            )}
          </div>
        )}

        {result && !isLoading && (
          <div className="flex items-center gap-2 px-3 py-2.25 bg-[#f0fdf4] border border-[#bbf7d0] rounded-[10px]">
            <div className="w-1.75 h-1.75 rounded-full bg-[#22c55e] shrink-0" />
            <span className="text-[12px] text-[#16a34a] font-medium">
              Analysis complete
            </span>
          </div>
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
            : result
              ? "Re-analyse brief"
              : "Analyse brief now"}
        </button>
      </div>
    </div>
  );
}
