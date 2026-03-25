import { AnalysisResult } from "../ResultLoader";
import { Card } from "../dashboard/Card";

export default function TasksList({
  tasks,
}: {
  tasks: AnalysisResult["tasks"];
}) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <Card title={`Tasks (${tasks.length})`}>
      <div className="flex flex-col gap-3">
        {tasks.map((task, i) => (
          <div
            key={i}
            className="border-[1.5px] border-[#f0ece6] rounded-xl overflow-hidden"
          >
            {/* Task header */}
            <div className="p-3 sm:p-[12px_16px] bg-[#fafaf8] flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C8102E] text-white shrink-0 mt-0.5">
                    {task.id}
                  </span>
                  <p className="text-[13px] font-semibold text-[#111] leading-snug min-w-0 wrap-break-word">
                    {task.title}
                  </p>
                </div>
                <p className="text-[12px] text-[#777] leading-[1.6]">
                  {task.description}
                </p>
              </div>

              <div className="flex flex-row items-baseline gap-1.5 sm:flex-col sm:items-end sm:gap-0 shrink-0">
                <p className="text-[18px] sm:text-[18px] font-bold text-[#111] tracking-[-0.02em]">
                  {task.estimatedHours}h
                </p>
                <p className="text-[10px] text-[#bbb]">estimated</p>
              </div>
            </div>

            {/* Subtasks */}
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="p-3 sm:p-[10px_16px] flex flex-col gap-2">
                {task.subtasks.map((sub, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <div className="w-4.5 h-4.5 rounded-[5px] bg-[#f0ece6] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[9px] font-semibold text-[#888]">
                        {j + 1}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-[#333] wrap-break-word">
                        {sub.title}
                      </p>
                      <p className="text-[11px] text-[#999] mt-0.5 leading-normal">
                        {sub.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Deliverables */}
            {task.deliverables && task.deliverables.length > 0 && (
              <div className="p-3 sm:p-[10px_16px] border-t border-[#f0ece6] bg-[#fef9f9] flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] font-bold text-[#C8102E] uppercase tracking-[0.06em] mr-1 shrink-0">
                  Deliver:
                </span>
                {task.deliverables.map((d, j) => (
                  <span
                    key={j}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-[#fecaca] text-[#991b1b] wrap-break-word"
                  >
                    {d}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
