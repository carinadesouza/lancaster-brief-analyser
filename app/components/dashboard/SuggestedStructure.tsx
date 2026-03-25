import { AnalysisResult } from '../ResultLoader'
import { Card } from '../dashboard/Card'

export default function SuggestedStructure({ structure }: { structure: AnalysisResult['suggestedStructure'] }) {
  if (!structure || structure.length === 0) return null

  return (
    <Card title="Suggested structure">
      <div className="flex flex-col gap-2.5">
        {structure.map((s, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5.5 h-5.5 rounded-full bg-[#f0ece6] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-semibold text-[#888]">{i + 1}</span>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#111]">{s.section}</p>
              {s.estimatedLength && <p className="text-[11px] text-[#bbb] mt-0.5">{s.estimatedLength}</p>}
              <p className="text-[11px] text-[#999] mt-0.5 leading-normal">{s.purpose}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
