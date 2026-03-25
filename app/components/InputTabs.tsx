"use client";

import React from "react";

export type Tab = "paste" | "upload";

interface InputTabsProps {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function InputTabs({ tab, onTabChange }: InputTabsProps) {
  return (
    <div className="flex bg-[#f4f3f0] rounded-[10px] p-0.75 gap-0.75">
      {(["paste", "upload"] as Tab[]).map((t) => (
        <button
          key={t}
          onClick={() => onTabChange(t)}
          className={`flex-1 py-2 sm:py-1.75 text-[12px] font-medium rounded-lg transition-colors ${
            tab === t
              ? "bg-white text-[#111] shadow-[0_1px_3px_rgba(0,0,0,0.07)]"
              : "bg-transparent text-[#999]"
          }`}
        >
          {t === "paste" ? "Paste text" : "Upload PDF"}
        </button>
      ))}
    </div>
  );
}
