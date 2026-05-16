import { useEffect, useState }
from "react";

const stages = [

    "Uploading Resume...",
    "Extracting Skills...",
    "Analyzing Job Description...",
    "Running AI Analysis...",
    "Generating Interview Questions...",
    "Building Final Report..."

];

const AIProcessing = () => {

    const [currentStage, setCurrentStage] =
        useState(0);

    useEffect(() => {

        const interval = setInterval(() => {

            setCurrentStage((prev) => {

                if (prev < stages.length - 1) {

                    return prev + 1;

                }

                return prev;

            });

        }, 1500);

        return () =>
            clearInterval(interval);

    }, []);

    return (

        <div className="fixed inset-0 bg-slate-950 z-50 flex items-center justify-center px-6">

            <div className="max-w-xl w-full text-center">

                {/* Spinner */}

                <div className="w-24 h-24 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-10" />

                {/* Title */}

                <h1 className="text-5xl font-bold text-white mb-4">

                    AI Processing

                </h1>

                <p className="text-slate-400 text-lg mb-10">

                    Please wait while we generate your personalized interview report.

                </p>

                {/* Stages */}

                <div className="space-y-4 text-left">

                    {

                        stages.map((stage, index) => (

                            <div

                                key={index}

                                className={`p-4 rounded-2xl border transition-all duration-300 ${

                                    index <= currentStage

                                        ? "bg-indigo-500/10 border-indigo-500/40 text-white"

                                        : "bg-slate-900 border-slate-800 text-slate-500"

                                }`}

                            >

                                {stage}

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default AIProcessing;