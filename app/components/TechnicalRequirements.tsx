import { AnalysisResult } from './ResultLoader'
import { Card } from './Card'

export default function TechnicalRequirements({ requirements }: { requirements: AnalysisResult['technicalRequirements'] }) {
  if (!requirements || requirements.length === 0) return null

  return (
    <Card title="Technical requirements">
      <div className="flex flex-wrap gap-1.75">
        {requirements.map((tool, i) => (
          <span key={i} className="text-[12px] px-3 py-1.25 rounded-full bg-[#f4f3f0] text-[#444] border border-[#e8e5e0] font-medium">{tool}</span>
        ))}
      </div>
    </Card>
  )
}