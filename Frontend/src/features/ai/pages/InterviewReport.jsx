import { useEffect, useState } from "react";
import ReadinessCard from "../components/report/ReadinessCard";
import StrengthsCard from "../components/report/StrengthsCard";
import WeaknessesCard from "../components/report/WeaknessesCard";
import QuestionsCard from "../components/report/QuestionCard";
import SkillGapCard from "../components/report/SkillGapCard";
import useDownloadReport from "../hooks/useDownloadReport";

const InterviewReport = () => {
  const [report, setReport] = useState(null);
  const { downloadReport, downloading } = useDownloadReport();

  useEffect(() => {
    const storedReport = localStorage.getItem("interviewReport");
    if (storedReport) {
      setReport(JSON.parse(storedReport));
    }
  }, []);

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">No Report Found</h1>
          <p className="text-slate-400">Please analyze your interview first.</p>
        </div>
      </div>
    );
  }

  const aiReport = report.aiReport;
  const matchedSkills = report.matchedSkills || [];
  const missingSkills = report.missingSkills || [];
  const total = matchedSkills.length + missingSkills.length;
  const score = total > 0
    ? Math.round((matchedSkills.length / total) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header + Download Button */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-6xl font-extrabold tracking-tight">
              Interview Report
            </h1>
            <p className="text-slate-400 mt-4 text-lg">
              Personalized AI-generated interview readiness analysis.
            </p>
          </div>

          <button
            onClick={downloadReport}
            disabled={downloading}
            className="mt-2 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 px-6 py-3 rounded-xl font-semibold text-white"
          >
            {downloading ? (
              <>
                <span className="animate-spin">⏳</span>
                Generating PDF...
              </>
            ) : (
              <>
                ⬇ Download Report
              </>
            )}
          </button>
        </div>

        {/* Capture Area */}
        <div id="report-content" className="space-y-10">

          <ReadinessCard
            score={score}
            matchedSkills={matchedSkills}
            missingSkills={missingSkills}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StrengthsCard strengths={aiReport?.strengths || []} />
            <WeaknessesCard weaknesses={aiReport?.weaknesses || []} />
          </div>

          <SkillGapCard
            skillGapAnalysis={aiReport?.skillGapAnalysis || []}
            resumeSkills={report.ResumeExtractedSkills || []}
            jobSkills={report.JobExtractedSkills || []}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <QuestionsCard
              title="Technical Interview Questions"
              questions={aiReport?.technicalQuestions || []}
              type="technical"
            />
            <QuestionsCard
              title="Behavioral Interview Questions"
              questions={aiReport?.behavioralQuestions || []}
              type="behavioral"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default InterviewReport;