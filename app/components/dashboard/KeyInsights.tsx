import { AnalysisResult } from '../ResultLoader'
import { Card } from '../dashboard/Card'

const insightStyles = {
  warning:     { bg: 'bg-[#fffbeb]', border: 'border-[#fde68a]', dot: 'bg-[#d97706]', text: 'text-[#92400e]' },
  tip:         { bg: 'bg-[#eff6ff]', border: 'border-[#bfdbfe]', dot: 'bg-[#3b82f6]', text: 'text-[#1e40af]' },
  requirement: { bg: 'bg-[#fef2f2]', border: 'border-[#fecaca]', dot: 'bg-[#C8102E]', text: 'text-[#991b1b]' },
  note:        { bg: 'bg-[#f5f3ff]', border: 'border-[#ddd6fe]', dot: 'bg-[#7c3aed]', text: 'text-[#4c1d95]' },
}

export default function KeyInsights({ insights }: { insights: AnalysisResult['keyInsights'] }) {
  if (!insights || insights.length === 0) return null

  return (
    <Card title="Key insights">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {insights.map((insight, i) => {
          const s = insightStyles[insight.type] || insightStyles.note
          return (
            <div key={i} className={`flex items-start gap-2.25 p-[10px_12px] ${s.bg} border ${s.border} rounded-[10px]`}>
              <div className={`w-1.75 h-1.75 rounded-full ${s.dot} shrink-0 mt-1`}/>
              <div>
                <span className={`text-[9px] text-black font-bold uppercase tracking-[0.06em] block mb-0.5 ${s.text.replace('text-', 'text- opacity-70')}`}>{insight.type}</span>
                <p className={`text-[12px] leading-normal ${s.text}`}>{insight.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}