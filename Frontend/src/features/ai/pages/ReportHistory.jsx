import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyReports, deleteReport } from "../services/interview.api";

// ─────────────────────────────
// Delete Confirmation Modal
// ─────────────────────────────
const DeleteModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center space-y-4">
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-2xl">
                    🗑️
                </div>
                <h2 className="text-xl font-bold text-white">Delete Report?</h2>
                <p className="text-slate-400 text-sm">
                    This action cannot be undone. The report will be permanently removed.
                </p>
            </div>
            <div className="flex gap-3 mt-8">
                <button
                    onClick={onCancel}
                    className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition text-sm font-medium"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition text-white text-sm font-semibold"
                >
                    Yes, Delete
                </button>
            </div>
        </div>
    </div>
);

const ReportHistory = () => {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // ← controls modal

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getMyReports();
                const sorted = (data.reports || []).sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setReports(sorted);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    // ─────────────────────────────
    // Delete Handler
    // ─────────────────────────────
    const handleDeleteConfirm = async () => {
        try {
            setDeletingId(confirmDeleteId);
            await deleteReport(confirmDeleteId);
            setReports((prev) => prev.filter((r) => r._id !== confirmDeleteId));
        } catch (error) {
            console.error("Failed to delete report:", error);
        } finally {
            setDeletingId(null);
            setConfirmDeleteId(null);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-green-400";
        if (score >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    const getScoreBg = (score) => {
        if (score >= 80) return "bg-green-500/10 border-green-500/30";
        if (score >= 60) return "bg-yellow-500/10 border-yellow-500/30";
        return "bg-red-500/10 border-red-500/30";
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return "Interview Ready";
        if (score >= 60) return "Moderately Ready";
        return "Needs Improvement";
    };

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    const calcScore = (report) => {
        const matched = report.matchedSkills?.length || 0;
        const missing = report.missingSkills?.length || 0;
        const total = matched + missing;
        return total > 0 ? Math.round((matched / total) * 100) : 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-slate-400">Loading your reports...</p>
                </div>
            </div>
        );
    }

    if (reports.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">No Reports Yet</h1>
                    <p className="text-slate-400">Analyze your first interview to see reports here.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold"
                    >
                        Analyze Interview
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white py-12 px-6">

            {/* Delete Modal */}
            {confirmDeleteId && (
                <DeleteModal
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setConfirmDeleteId(null)}
                />
            )}

            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-5xl font-extrabold tracking-tight">
                            Report History
                        </h1>
                        <p className="text-slate-400 mt-3 text-lg">
                            {reports.length} report{reports.length !== 1 ? "s" : ""} found
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold"
                    >
                        + New Analysis
                    </button>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {reports.map((report) => {
                        const score = calcScore(report);
                        return (
                            <div
                                key={report._id}
                                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-5 hover:border-slate-600 transition-all duration-300"
                            >
                                <div>
                                    <h2 className="text-xl font-bold text-white truncate">
                                        {report.targetRole}
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-1">
                                        {report.experienceLevel}
                                    </p>
                                </div>

                                <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${getScoreBg(score)}`}>
                                    <span className="text-slate-300 text-sm font-medium">
                                        Readiness Score
                                    </span>
                                    <div className="text-right">
                                        <span className={`text-2xl font-extrabold ${getScoreColor(score)}`}>
                                            {score}%
                                        </span>
                                        <p className={`text-xs mt-0.5 ${getScoreColor(score)}`}>
                                            {getScoreLabel(score)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 text-sm">
                                    <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-center">
                                        <p className="text-green-400 font-bold text-lg">
                                            {report.matchedSkills?.length || 0}
                                        </p>
                                        <p className="text-green-300/70 text-xs">Matched</p>
                                    </div>
                                    <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-center">
                                        <p className="text-red-400 font-bold text-lg">
                                            {report.missingSkills?.length || 0}
                                        </p>
                                        <p className="text-red-300/70 text-xs">Missing</p>
                                    </div>
                                </div>

                                <p className="text-slate-500 text-xs">
                                    📅 {formatDate(report.createdAt)}
                                </p>

                                <div className="flex gap-3 mt-auto">
                                    <button
                                        onClick={() => navigate(`/report/${report._id}`)}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 transition py-2 rounded-lg text-sm font-semibold"
                                    >
                                        View Report
                                    </button>
                                    <button
                                        onClick={() => setConfirmDeleteId(report._id)}
                                        disabled={deletingId === report._id}
                                        className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition text-sm disabled:opacity-50"
                                    >
                                        {deletingId === report._id ? "..." : "🗑"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ReportHistory;