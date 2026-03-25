"use client";

import React from "react";
import InputTabs, { Tab } from "./InputTabs";
import Dropzone from "./Dropzone";
import { AnalysisResult } from "./ResultLoader";

interface LeftPanelProps {
  tab: Tab;
  onTabChange: (t: Tab) => void;
  text: string;
  onTextChange: (val: string) => void;
  wordCount: number;
  fileName: string;
  onFileUpload: (f: File) => void;
  onClearFile: () => void;
  result: AnalysisResult | null;
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
    <div className="w-full md:w-105 shrink-0 bg-white md:border-r border-[#e8e5e0] flex flex-col">
      {/* Header */}
      <div className="hidden md:block px-5 pt-4.5 pb-3.5 border-b border-[#f0ece6]">
        <p className="text-[13px] font-semibold text-[#111] mb-0.5">Input</p>
        <p className="text-[11px] text-[#aaa]">Paste text or upload a PDF</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 flex flex-col gap-3.5">
        <InputTabs tab={tab} onTabChange={onTabChange} />

        {tab === "paste" && (
          <div className="flex flex-col gap-2">
            <textarea
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Paste your assignment brief here..."
              className="w-full min-h-70 sm:min-h-75 px-4 py-4 text-[13px] leading-[1.7] text-[#333] bg-[#fafaf8] border border-[#e8e5e0] rounded-xl outline-none resize-y font-sans transition-all focus:border-[#C8102E] focus:bg-white"
            />
            <p className="text-[11px] text-[#bbb] text-right">
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

        {/* Detected Info */}
        {result &&
          (result.module ||
            (result.author && result.author !== "Not specified")) && (
            <div className="px-4 py-3 bg-[#fafaf8] border border-[#e8e5e0] rounded-xl">
              {result.module && (
                <>
                  <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.06em] mb-1">
                    Detected module
                  </p>
                  <p className="text-[13px] font-semibold text-[#111] leading-[1.4]">
                    {result.module}
                  </p>
                </>
              )}
              {result.author && result.author !== "Not specified" && (
                <p
                  className={`text-[11px] text-[#999] ${result.module ? "mt-1" : ""}`}
                >
                  {result.author}
                </p>
              )}
            </div>
          )}

        {/* Error */}
        {error && (
          <div className="px-3 py-2.5 bg-[#fef2f2] border border-[#fecaca] rounded-[10px]">
            <p className="text-[12px] text-[#dc2626]">{error}</p>
          </div>
        )}
      </div>

      {/* Footer Button */}
      <div className="px-4 sm:px-5 py-3.5 border-t border-[#f0ece6]">
        <button
          onClick={onAnalyse}
          disabled={isLoading || !text.trim()}
          className={`w-full py-3.5 sm:py-3 text-[13px] font-semibold text-white rounded-[10px] tracking-[-0.01em] transition-all ${
            isLoading || !text.trim()
              ? "bg-[#f0a0a0] cursor-not-allowed"
              : "bg-[#C8102E] hover:opacity-90 cursor-pointer"
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
