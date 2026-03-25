import { AnalysisResult } from './ResultLoader'
import { Card } from './Card'

export default function SubmissionRequirements({ requirements }: { requirements: AnalysisResult['submissionRequirements'] }) {
  if (!requirements || requirements.length === 0) return null

  return (
    <Card title="Submission requirements">
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5">
        {requirements.map((req, i) => (
          <div key={i} className="p-[10px_14px] bg-[#fafaf8] border border-[#ede9e3] rounded-[10px]">
            <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.06em] mb-1">{req.label}</p>
            <p className="text-[13px] font-semibold text-[#111]">{req.value}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
