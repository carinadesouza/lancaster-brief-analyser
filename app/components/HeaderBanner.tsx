import { AnalysisResult } from './ResultLoader'

export default function HeaderBanner({ result }: { result: AnalysisResult }) {
  const totalHours =
    result.totalEstimatedHours ??
    result.tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
  const complexityColorClass = result.complexityScore <= 3 ? 'text-[#16a34a]' : result.complexityScore <= 6 ? 'text-[#d97706]' : 'text-[#C8102E]'
  const complexityBorderClass = result.complexityScore <= 3 ? 'border-[#16a34a]' : result.complexityScore <= 6 ? 'border-[#d97706]' : 'border-[#C8102E]'

  return (
    <div className="bg-[#111] rounded-2xl p-5 sm:p-[20px_24px]">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-[10px] text-[#555] uppercase tracking-[0.07em] mb-1">
            Module
          </p>
          <p className="text-[16px] font-bold text-white tracking-[-0.02em]">
            {result.module}
          </p>
        </div>
        <div className="flex gap-5 sm:justify-end">
          {result.author && (
            <div className="sm:text-right">
              <p className="text-[10px] text-[#555] uppercase tracking-[0.07em] mb-1">
                Set by
              </p>
              <p className="text-[12px] font-medium text-[#ccc]">
                {result.author}
              </p>
            </div>
          )}
          {result.deadline && (
            <div className="sm:text-right">
              <p className="text-[10px] text-[#555] uppercase tracking-[0.07em] mb-1">
                Deadline
              </p>
              <p className="text-[12px] font-semibold text-[#f87171]">
                {result.deadline}
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="text-[13px] text-[#999] leading-[1.7] mb-3">
        {result.overview}
      </p>
      <div className="flex items-center gap-4 pt-3 border-t border-[#222]">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full border-2 ${complexityBorderClass} flex items-center justify-center`}
          >
            <span className={`text-[13px] font-bold ${complexityColorClass}`}>
              {result.complexityScore}
            </span>
          </div>
          <div>
            <p className="text-[10px] text-[#555] uppercase tracking-[0.06em]">
              Complexity
            </p>
            <p className="text-[11px] text-[#777] mt-0.5">
              {result.complexityReason}
            </p>
          </div>
        </div>
        <div className="ml-auto text-right">
          <p className="text-[10px] text-[#555] uppercase tracking-[0.06em]">
            Estimated total
          </p>
          <p className="text-[20px] font-bold text-white tracking-[-0.02em]">
            {totalHours}h
          </p>
        </div>
      </div>
    </div>
  );
}
