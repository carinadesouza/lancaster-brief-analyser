import { ArrowRight } from "lucide-react";
interface HeaderProps {
  stepsCompleted?: boolean[];
}

export default function Header({
  stepsCompleted = [false, false, false],
}: HeaderProps) {
  const steps = [
    { num: "1", label: "Upload brief" },
    { num: "2", label: "AI analyses" },
    { num: "3", label: "Get breakdown" },
  ];

  return (
    <header className="flex items-center px-5 gap-2.5 h-13 bg-white border-b border-[#e8e5e0] shrink-0">
      {/* Logo / Title */}
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

      {/* Steps (static, no logic) */}
      <div className="ml-auto flex items-center">
        <div className="w-px h-5 bg-[#e8e5e0] mr-5 shrink-0" />
        {steps.map((step, i) => {
          const isCompleted = stepsCompleted[i];
          const isActive =
            !isCompleted && i === stepsCompleted.findIndex((s) => !s);

          return (
            <div key={i} className="flex items-center">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isCompleted
                      ? "bg-[#22c55e] border border-[#22c55e]"
                      : isActive
                        ? "bg-[#f4f3f0] border border-[#C8102E]"
                        : "bg-[#f4f3f0] border border-[#e0ddd8]"
                  }`}
                >
                  {isCompleted ? (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path
                        d="M1.5 4.5l2 2 4-4"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span
                      className={`text-[9.5px] font-bold ${
                        isActive ? "text-[#C8102E]" : "text-[#aaa]"
                      }`}
                    >
                      {step.num}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[11.5px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                    isCompleted
                      ? "text-[#22c55e]"
                      : isActive
                        ? "text-[#111]"
                        : "text-[#aaa]"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <ArrowRight
                  className={`w-3 h-3 mx-2.5 transition-colors duration-300 ${
                    isCompleted ? "text-[#86efac]" : "text-[#ddd]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
}
