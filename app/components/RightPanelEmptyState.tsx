"use client"

import React from "react";

export default function RightPanelEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-10">
      <div className="w-14 h-14 rounded-2xl bg-white border-[1.5px] border-[#e8e5e0] flex items-center justify-center">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M6 2.5h10l6 6v15H6V2.5z"
            stroke="#C8102E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M16 2.5v6h6" stroke="#C8102E" strokeWidth="1.5" />
          <path
            d="M9 13h8M9 17h5"
            stroke="#C8102E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-[16px] font-semibold text-[#111] mb-2 tracking-[-0.02em]">
          Ready to analyse your brief
        </h2>
        <p className="text-[13px] text-[#999] leading-[1.7] max-w-85">
          Paste or upload any assignment brief. The AI will extract tasks,
          marking criteria, time estimates, and practical tips.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {["Any format", "Any module", "PDF or text", "Instant results"].map(
          (tag) => (
            <span
              key={tag}
              className="text-[11px] px-3 py-1.25 bg-white border border-[#e8e5e0] rounded-full text-[#000]"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
}
