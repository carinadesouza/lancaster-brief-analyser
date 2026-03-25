import { AnalysisResult } from "../ResultLoader";
import { Card } from "../dashboard/Card";
import { FileText, Video, Presentation, GitBranch, File } from "lucide-react";
import { LucideIcon } from "lucide-react";

const SLOT_STYLES: { iconBg: string; iconColor: string; Icon: LucideIcon }[] = [
  { iconBg: "bg-blue-50", iconColor: "text-blue-500", Icon: FileText },
  { iconBg: "bg-amber-50", iconColor: "text-amber-500", Icon: Video },
  { iconBg: "bg-green-50", iconColor: "text-green-500", Icon: Presentation },
  { iconBg: "bg-purple-50", iconColor: "text-purple-500", Icon: GitBranch },
  { iconBg: "bg-rose-50", iconColor: "text-rose-500", Icon: File },
  { iconBg: "bg-teal-50", iconColor: "text-teal-500", Icon: File },
];

export default function SubmissionRequirements({
  requirements,
}: {
  requirements: AnalysisResult["submissionRequirements"];
}) {
  if (!requirements || requirements.length === 0) return null;

  return (
    <Card title="Submission requirements">
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2.5 py-1">
        {requirements.map((req, i) => {
          const { iconBg, iconColor, Icon } =
            SLOT_STYLES[i % SLOT_STYLES.length];
          return (
            <div
              key={i}
              className="flex flex-col gap-2 p-[14px_16px] bg-white border border-[#e5e1da] rounded-xl"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg}`}
              >
                <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.05em] mb-1">
                  {req.label}
                </p>
                <p className="text-[13px] font-medium text-[#111] leading-snug">
                  {req.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
