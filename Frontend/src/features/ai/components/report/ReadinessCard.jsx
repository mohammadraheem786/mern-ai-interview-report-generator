import formatSkill
from "../../../../utils/formatSkill";

const ReadinessCard = ({

    score,
    matchedSkills = [],
    missingSkills = []

}) => {

    // ─────────────────────────────
    // Score Color
    // ─────────────────────────────

    const getScoreColor = () => {

        if (score >= 80)
            return "bg-green-500";

        if (score >= 60)
            return "bg-yellow-500";

        return "bg-red-500";

    };

    // ─────────────────────────────
    // Score Label
    // ─────────────────────────────

    const getScoreLabel = () => {

        if (score >= 80)
    return "Interview Ready";

if (score >= 60)
    return "Moderately Ready";

if (score >= 40)
    return "Improving";

return "Needs Improvement";

    };

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-12">

                {/* ───────────────────── */}
                {/* Left Section */}
                {/* ───────────────────── */}

                <div className="flex-1">

                    <h2 className="text-4xl font-bold mb-4">

                        Interview Readiness

                    </h2>

                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">

                        AI-powered evaluation of your interview preparation
                        based on resume skills, missing technologies,
                        role expectations, and industry-level requirements.

                    </p>

                    {/* Progress Section */}

                    <div className="mt-10">

                        <div className="flex justify-between items-center mb-3">

                            <span className="text-slate-300 font-medium">

                                Readiness Score

                            </span>

                            <span className="text-2xl font-bold text-white">

                                {score}%

                            </span>

                        </div>

                        {/* Progress Bar */}

                        <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden">

                            <div

                                className={`h-full ${getScoreColor()} transition-all duration-700 ease-in-out`}

                                style={{

                                    width: `${score}%`

                                }}

                            />

                        </div>

                        {/* Status */}

                        <p className="mt-4 text-xl font-semibold text-indigo-400">

                            {getScoreLabel()}

                        </p>

                    </div>

                </div>

                {/* ───────────────────── */}
                {/* Right Section */}
                {/* ───────────────────── */}

                <div className="w-full xl:max-w-md flex flex-col gap-8">

                    {/* Matched Skills */}

                    <div>

                        <h3 className="text-green-400 font-bold text-lg mb-4">

                            Matched Skills

                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {

                                matchedSkills.length > 0

                                    ? matchedSkills.map((skill) => (

                                        <span

                                            key={skill}

                                            className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-medium"

                                        >

                                            {formatSkill(skill)}

                                        </span>

                                    ))

                                    : (

                                        <p className="text-slate-500 text-sm">

                                            No matched skills found

                                        </p>

                                    )

                            }

                        </div>

                    </div>

                    {/* Missing Skills */}

                    <div>

                        <h3 className="text-red-400 font-bold text-lg mb-4">

                            Missing Skills

                        </h3>

                        <div className="flex flex-wrap gap-3">

                            {

                                missingSkills.length > 0

                                    ? missingSkills.map((skill) => (

                                        <span

                                            key={skill}

                                            className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-medium"

                                        >

                                            {skill}

                                        </span>

                                    ))

                                    : (

                                        <p className="text-slate-500 text-sm">

                                            No missing skills detected

                                        </p>

                                    )

                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ReadinessCard;