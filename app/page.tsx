"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleEnterApp = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif] flex flex-col">
      {/* Navbar */}
      <header className="w-full border-b border-gray-100">
        <div className="w-full px-6 py-4 flex items-center justify-start">
          <div className="flex items-center gap-3">
            <div className="w-7.5 h-7.5 rounded-lg bg-[#C8102E] flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M2.5 1.5h7l3.5 3.5v9h-10.5v-12.5z"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path d="M9.5 1.5v3.5h3.5" stroke="white" strokeWidth="1.2" />
                <path
                  d="M4.5 7.5h6M4.5 10h4"
                  stroke="white"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#111] tracking-[-0.01em]">
                Assignment Brief Analyser
              </p>
              <p className="text-[11px] text-[#aaa]">Lancaster University</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <section className="text-center max-w-2xl px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#555656] leading-tight mb-6">
            Understand any brief
            <br />
            <span className="text-[#C8102E]">in seconds.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#555656]/70 leading-relaxed mb-10">
            Paste or upload a project brief and get an instant AI-powered
            breakdown — themes, risks, and next steps, all in one clear
            dashboard.
          </p>

          <button
            onClick={handleEnterApp}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#C8102E] text-white text-[15px] font-semibold shadow-md hover:bg-[#a50d25] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-150"
          >
            Analyse a brief
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </section>
      </main>
    </div>
  );
}
