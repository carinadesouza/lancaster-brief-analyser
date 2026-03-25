import HeaderBanner from "./HeaderBanner";
import SubmissionRequirements from "./SubmissionRequirements";
import TasksList from "./TasksList";
import MarkingCriteria from "./MarkingCriteria";
import SuggestedStructure from "./SuggestedStructure";
export type AnalysisResult = {
  module: string
  author: string | null
  deadline: string | null
  overview: string
  tasks: {
    id: string
    title: string
    description: string
    subtasks: { title: string; description: string }[]
    deliverables: string[]
    estimatedHours: number
  }[]
  submissionRequirements: { label: string; value: string }[]
  markingCriteria: { name: string; weight: number | null; description: string }[]
  suggestedStructure: { section: string; purpose: string; estimatedLength: string | null }[]
  totalEstimatedHours: number
  complexityScore: number
  complexityReason: string
}

export default function ResultsDashboard({
  result,
}: {
  result: AnalysisResult;
}) {
  return (
    <div className="p-6 flex flex-col gap-4">
      <HeaderBanner result={result} />
      <SubmissionRequirements requirements={result.submissionRequirements} />
      <TasksList tasks={result.tasks} />

      {/* Marking criteria and Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <MarkingCriteria criteria={result.markingCriteria} />
        <SuggestedStructure structure={result.suggestedStructure} />
      </div>
    </div>
  );
}
