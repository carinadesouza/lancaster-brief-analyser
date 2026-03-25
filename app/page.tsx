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
  const [result, setResult] = useState<any>(null);
  useState<AnalysisResult | null>(null);
  const handleFileUpload = async (file: File) => {
    setFileName(file.name);
    const arrayBuffer = await file.arrayBuffer();

    let pdfjsLib = await import("pdfjs-dist");;

    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText +=
        content.items
          .map((item: unknown) => (item as { str: string }).str)
          .join(" ") + "\n";
    }
    setText(fullText);
  };

  const handleClearFile = () => {
    setFileName("");
    setText("");
    setResult(null);
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setText("");
    setFileName("");
    setResult(null);
    setError(null);
  };

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
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col h-screen font-['DM_Sans',sans-serif] bg-[#f4f3f0]">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          tab={tab}
          onTabChange={handleTabChange}
          text={text}
          onTextChange={setText}
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
