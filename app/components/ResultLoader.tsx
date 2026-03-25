import HeaderBanner from "./dashboard/HeaderBanner";
import SubmissionRequirements from "./dashboard/SubmissionRequirements";
import TasksList from "./dashboard/TasksList";
import MarkingCriteria from "./dashboard/MarkingCriteria";
import SuggestedStructure from "./dashboard/SuggestedStructure";
import KeyInsights from "./dashboard/KeyInsights";
import TechnicalRequirements from "./dashboard/TechnicalRequirements";

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
  markingCriteria: {
    name: string;
    weight: number | null;
    description: string;
  }[];
  suggestedStructure: {
    section: string;
    purpose: string;
    estimatedLength: string | null;
  }[];
  keyInsights: {
    type: "warning" | "tip" | "requirement" | "note";
    text: string;
  }[];
  technicalRequirements?: string[];
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
    <div className="p-4 sm:p-6 flex flex-col gap-4">
      <HeaderBanner result={result} />
      <SubmissionRequirements requirements={result.submissionRequirements} />
      <TasksList tasks={result.tasks} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <MarkingCriteria criteria={result.markingCriteria} />
        <SuggestedStructure structure={result.suggestedStructure} />
      </div>

      <KeyInsights insights={result.keyInsights} />
      <TechnicalRequirements requirements={result.technicalRequirements} />
    </div>
  );
}
