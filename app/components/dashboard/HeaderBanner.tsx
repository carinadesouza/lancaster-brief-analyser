import { AnalysisResult } from "../ResultLoader";

export default function HeaderBanner({ result }: { result: AnalysisResult }) {
  const totalHours =
    result.totalEstimatedHours ??
    result.tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
  const complexityColorClass =
    result.complexityScore <= 3
      ? "text-[#16a34a]"
      : result.complexityScore <= 6
        ? "text-[#d97706]"
        : "text-[#C8102E]";
  const complexityBorderClass =
    result.complexityScore <= 3
      ? "border-[#16a34a]"
      : result.complexityScore <= 6
        ? "border-[#d97706]"
        : "border-[#C8102E]";

  return (
    <div className="bg-[#111] rounded-2xl p-4 xs:p-5 sm:p-6">
      <div className="flex flex-col gap-3 mb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-[10px] text-[#555] uppercase tracking-[0.07em] mb-1">
            Module
          </p>
          <p className="text-[15px] sm:text-[16px] font-bold text-white tracking-[-0.02em] leading-snug wrap-break-word">
            {result.module}
          </p>
        </div>

        <div className="flex flex-row gap-5 sm:shrink-0 sm:justify-end">
          {result.author && (
            <div className="sm:text-right">
              <p className="text-[10px] text-[#555] uppercase tracking-[0.07em] mb-1">
                Set by
              </p>
              <p className="text-[12px] font-medium text-[#ccc] whitespace-nowrap">
                {result.author}
              </p>
            </div>
          )}
          {result.deadline && (
            <div className="sm:text-right">
              <p className="text-[10px] text-[#555] uppercase tracking-[0.07em] mb-1">
                Deadline
              </p>
              <p className="text-[12px] font-semibold text-[#f87171] whitespace-nowrap">
                {result.deadline}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="text-[12px] sm:text-[13px] text-[#999] leading-[1.7] mb-3">
        {result.overview}
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-[#222]">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div
            className={`w-8 h-8 shrink-0 rounded-full border-2 ${complexityBorderClass} flex items-center justify-center`}
          >
            <span className={`text-[13px] font-bold ${complexityColorClass}`}>
              {result.complexityScore}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-[#555] uppercase tracking-[0.06em]">
              Complexity
            </p>
            <p className="text-[11px] text-[#777] mt-0.5 truncate sm:whitespace-normal sm:overflow-visible">
              {result.complexityReason}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] text-[#555] uppercase tracking-[0.06em]">
            Estimated total
          </p>
          <p className="text-[20px] sm:text-[22px] font-bold text-white tracking-[-0.02em]">
            {totalHours}h
          </p>
        </div>
      </div>
    </div>
  );
}
