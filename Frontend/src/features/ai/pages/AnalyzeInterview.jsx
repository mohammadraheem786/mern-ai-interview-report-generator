import { useState }
from "react";

import UploadResumeForm
from "../components/UploadResumeForm";

import AIProcessing
from "../components/AIProcessing";

const AnalyzeInterview = () => {

    // ─────────────────────────────
    // Loading State
    // ─────────────────────────────

    const [loading, setLoading] =
        useState(false);

    return (

        <div className="min-h-screen bg-slate-950 text-white p-10 relative">

            {/* AI Processing Overlay */}

            {

                loading && (

                    <AIProcessing />

                )

            }

            <div className="max-w-6xl mx-auto">

                {/* Header */}

                <h1 className="text-5xl font-bold">

                    AI Interview Analyzer

                </h1>

                <p className="mt-4 text-slate-400 text-lg">

                    Upload your resume and analyze your interview readiness.

                </p>

                {/* Upload Form */}

                <UploadResumeForm

                    setLoading={
                        setLoading
                    }

                />

            </div>

        </div>

    );

};

export default AnalyzeInterview;