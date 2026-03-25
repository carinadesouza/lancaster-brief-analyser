import HeaderBanner from "./HeaderBanner";
import SubmissionRequirements from "./SubmissionRequirements";
import TasksList from "./TasksList";

export type AnalysisResult = {
  module: string;
  author: string | null;
  deadline: string | null;
  overview: string;
  tasks: {
    id: string;
    title: string;
    description: string;
    subtasks: { title: string; description: string }[];
    deliverables: string[];
    estimatedHours: number;
  }[];
  submissionRequirements: { label: string; value: string }[];
  totalEstimatedHours: number;
  complexityScore: number;
  complexityReason: string;
};

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
    </div>
  );
}
