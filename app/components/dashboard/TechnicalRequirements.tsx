import { AnalysisResult } from "../ResultLoader";
import { Card } from "../dashboard/Card";

export default function TechnicalRequirements({
  requirements,
}: {
  requirements: AnalysisResult["technicalRequirements"];
}) {
  if (!requirements || requirements.length === 0) return null;

  return (
    <Card title="Technical requirements">
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {requirements.map((tool, i) => (
          <span
            key={i}
            className="text-[11px] sm:text-[12px] px-2.5 sm:px-3 py-1 rounded-full bg-[#f4f3f0] text-[#444] border border-[#e8e5e0] font-medium leading-tight"
          >
            {tool}
          </span>
        ))}
      </div>
    </Card>
  );
}
