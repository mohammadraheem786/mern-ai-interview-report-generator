import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReportById } from "../services/interview.api";
import ReadinessCard from "../components/report/ReadinessCard";
import StrengthsCard from "../components/report/StrengthsCard";
import WeaknessesCard from "../components/report/WeaknessesCard";
import QuestionsCard from "../components/report/QuestionCard";
import SkillGapCard from "../components/report/SkillGapCard";
import useDownloadReport from "../hooks/useDownloadReport";

const SingleReport = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { downloadReport, downloading } = useDownloadReport();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await getReportById(id);
                setReport(data.report);
            } catch (err) {
                console.error("Failed to fetch report:", err);
                setError("Report not found or you don't have access.");
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    // ─────────────────────────────
    // Loading
    // ─────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-slate-400">Loading report...</p>
                </div>
            </div>
        );
    }

    // ─────────────────────────────
    // Error
    // ─────────────────────────────
    if (error || !report) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Report Not Found</h1>
                    <p className="text-slate-400">{error}</p>
                    <button
                        onClick={() => navigate("/history")}
                        className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold"
                    >
                        Back to History
                    </button>
                </div>
            </div>
        );
    }

    // ─────────────────────────────
    // Data
    // ─────────────────────────────
    const aiReport = report.aiReport;
    const matchedSkills = report.matchedSkills || [];
    const missingSkills = report.missingSkills || [];
    const total = matchedSkills.length + missingSkills.length;
    const score = total > 0
        ? Math.round((matchedSkills.length / total) * 100)
        : 0;

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    return (
        <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <button
                            onClick={() => navigate("/history")}
                            className="text-slate-400 hover:text-white transition text-sm mb-4 flex items-center gap-2"
                        >
                            ← Back to History
                        </button>
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            {report.targetRole}
                        </h1>
                        <div className="flex items-center gap-4 mt-3">
                            <span className="text-slate-400 text-lg">
                                {report.experienceLevel}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-500 text-sm">
                                📅 {formatDate(report.createdAt)}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={downloadReport}
                        disabled={downloading}
                        className="mt-2 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 px-6 py-3 rounded-xl font-semibold"
                    >
                        {downloading ? "⏳ Generating PDF..." : "⬇ Download Report"}
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
                        resumeSkills={report.resumeSkills || []}
                        jobSkills={report.jobSkills || []}
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

export default SingleReport;