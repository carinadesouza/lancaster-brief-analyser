"use client";
import { useState } from "react";
import Header from "./components/Header";
import LeftPanel from "./components/LeftPanel";
import { Tab } from "./components/InputTabs";
import SkeletonLoader from "./components/SkeletonLoader";
import RightPanelEmptyState from "./components/RightPanelEmptyState";
import ResultsDashboard, { AnalysisResult } from "./components/ResultLoader";

export default function Home() {
  const [tab, setTab] = useState<Tab>("paste");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Unified text handler for (both paste and file upload will use this)
  const handleTextChange = (val: string) => {
    setText(val);
  };

  // File Uploading
  const handleFileUpload = async (file: File) => {
    setFileName(file.name);

    const arrayBuffer = await file.arrayBuffer();
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items.map((item: any) => item.str).join(" ") + "\n";
    }

    handleTextChange(fullText); 
    setResult(null);           
  };

  // AI Analysis
    const handleAnalyse = async () => {
      if (!text.trim() || text.trim().length < 50) {
        setError("Please paste your brief or upload a PDF first.");
        return;
      }
      setError(null);
      setIsLoading(true);
      try {
        const res = await fetch("/api/analyse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        if (res.status === 429 || res.status === 500) {
          const data = await res.json().catch(() => ({}));
          const isRateLimit =
            data?.error?.includes("rate_limit_exceeded") ||
            data?.error?.includes("Rate limit") ||
            res.status === 429;
          if (isRateLimit) {
            setError(
              "We've hit our AI usage limit for now. Please try again in about an hour — it resets automatically.",
            );
            return;
          }
        }

        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setResult(data);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Something went wrong.";

        if (msg.toLowerCase().includes("rate limit") || msg.includes("429")) {
          setError(
            "We've hit our AI usage limit for now. Please try again in about an hour — it resets automatically.",
          );
        } else {
          setError(msg);
        }
      } finally {
        setIsLoading(false);
      }
    };

  const handleClearFile = () => {
    setFileName("");
    setText("");
    setResult(null);
    setError(null);
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setText("");
    setFileName("");
    setResult(null);
    setError(null);
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Step state logic
  const isStep1Complete = text.trim().length > 0;  // Step 1 when text exists
  const isStep2Complete = isLoading || !!result;   // Step 2 green while AI is running
  const isStep3Complete = !!result;               // Step 3  when result exists

const stepsCompleted = [isStep1Complete, isStep2Complete, isStep3Complete];

  return (
    <div className="flex flex-col h-screen font-['DM_Sans',sans-serif] bg-[#f4f3f0]">
      <Header stepsCompleted={stepsCompleted} />

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          tab={tab}
          onTabChange={handleTabChange}
          text={text}
          onTextChange={handleTextChange}
          wordCount={wordCount}
          fileName={fileName}
          onFileUpload={handleFileUpload}
          onClearFile={handleClearFile}
          result={result}
          isLoading={isLoading}
          error={error}
          onAnalyse={handleAnalyse}
        />

        <div className="flex-1 overflow-y-auto bg-[#f4f3f0]">
          {isLoading ? (
            <SkeletonLoader />
          ) : result ? (
            <ResultsDashboard result={result} />
          ) : (
            <RightPanelEmptyState />
          )}
        </div>
      </div>
    </div>
  );
}