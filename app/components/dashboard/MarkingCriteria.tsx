import { AnalysisResult } from '../ResultLoader'
import { Card } from '../dashboard/Card'

export default function MarkingCriteria({ criteria }: { criteria: AnalysisResult['markingCriteria'] }) {
  if (!criteria || criteria.length === 0) return null

  const maxWeight = Math.max(...criteria.map(c => c.weight ?? 0)) || 1

  return (
    <Card title="Marking criteria">
      <div className="flex flex-col gap-3">
        {criteria.map((c, i) => (
          <div key={i}>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="text-[12px] text-[#333] flex-1 font-medium">{c.name}</span>
              {c.weight !== null && (
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-18 h-1.25 bg-[#f0ece6] rounded-[3px] overflow-hidden">
                    <div className="h-full bg-[#111] rounded-[3px]" style={{ width: `${(c.weight / maxWeight) * 100}%` }}/>
                  </div>
                  <span className="text-[11px] text-[#aaa] w-7.5 text-right">{c.weight}%</span>
                </div>
              )}
            </div>
            <p className="text-[11px] text-[#aaa] leading-normal">{c.description}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
