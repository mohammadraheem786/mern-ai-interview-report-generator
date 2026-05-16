import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

import roles
from "../constants/roles";

import {

    analyzeInterview

} from "../services/interview.api";

const UploadResumeForm = ({

    setLoading

}) => {

    // ─────────────────────────────
    // States
    // ─────────────────────────────
    const [dragOver, setDragOver] = useState(false);

    const [resume, setResume] =
        useState(null);

    const [jobDescription, setJobDescription] =
        useState("");

    const [targetRole, setTargetRole] =
        useState("");

    const [experienceLevel, setExperienceLevel] =
        useState("");

    const navigate =
        useNavigate();

    // ─────────────────────────────
    // Handle Submit
    // ─────────────────────────────

    const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
        setResume(file);
    } else {
        alert("Please upload a PDF file");
    }
};

const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
};

const handleDragLeave = () => setDragOver(false);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                // ─────────────────────────
                // Validation
                // ─────────────────────────

                if (

                    !resume ||
                    !jobDescription ||
                    !targetRole ||
                    !experienceLevel

                ) {

                    return alert(
                        "Please fill all fields"
                    );

                }

                // ─────────────────────────
                // Start Loading
                // ─────────────────────────

                setLoading(true);

                // ─────────────────────────
                // FormData
                // ─────────────────────────

                const formData =
                    new FormData();

                formData.append(
                    "resume",
                    resume
                );

                formData.append(
                    "jobDescription",
                    jobDescription
                );

                formData.append(
                    "targetRole",
                    targetRole
                );

                formData.append(
                    "experienceLevel",
                    experienceLevel
                );

                // ─────────────────────────
                // Token
                // ─────────────────────────

               const response = await analyzeInterview(formData);

const reportId = response.data.reportId;

navigate(`/report/${reportId}`);

            } catch (error) {

                console.log(error);

                setLoading(false);

                alert(
                    "Failed to analyze interview"
                );

            }

        };

    return (

        <div className="mt-10 max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

            <form

                onSubmit={handleSubmit}

                className="space-y-6"

            >

                {/* Resume Upload */}

                <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                        Upload Resume

                    </label>

                    <div
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onClick={() => document.getElementById("resume-input").click()}
    className={`
        relative cursor-pointer rounded-2xl border-2 border-dashed p-10
        flex flex-col items-center justify-center gap-3 transition-all duration-300
        ${dragOver
            ? "border-indigo-400 bg-indigo-500/10"
            : resume
                ? "border-green-500/50 bg-green-500/5"
                : "border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800"
        }
    `}
>
    <div className={`text-4xl ${resume ? "" : "opacity-40"}`}>
        {resume ? "✅" : "📄"}
    </div>

    {resume ? (
        <div className="text-center">
            <p className="text-green-400 font-semibold text-sm">{resume.name}</p>
            <p className="text-slate-500 text-xs mt-1">
                {(resume.size / 1024).toFixed(1)} KB — Click to change
            </p>
        </div>
    ) : (
        <div className="text-center">
            <p className="text-slate-300 font-medium text-sm">
                Drag & drop your resume here
            </p>
            <p className="text-slate-500 text-xs mt-1">
                or click to browse — PDF only
            </p>
        </div>
    )}

    <input
        id="resume-input"
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => setResume(e.target.files[0])}
    />
</div>

                </div>

                {/* Job Description */}

                <div>

                    <label className="block mb-2 text-sm font-medium text-slate-300">

                        Job Description

                    </label>

                    <textarea

                        rows="8"

                        value={jobDescription}

                        onChange={(e) =>

                            setJobDescription(
                                e.target.value
                            )

                        }

                        placeholder="Paste job description here..."

                        className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"

                    />

                </div>

                {/* Role + Experience */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Target Role */}

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-300">

                            Target Role

                        </label>

                        <select

                            value={targetRole}

                            onChange={(e) =>

                                setTargetRole(
                                    e.target.value
                                )

                            }

                            className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"

                        >

                            <option value="">

                                Select Role

                            </option>

                            {

                                roles.map((role) => (

                                    <option

                                        key={role}

                                        value={role}

                                    >

                                        {role}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* Experience Level */}

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-300">

                            Experience Level

                        </label>

                        <select

                            value={experienceLevel}

                            onChange={(e) =>

                                setExperienceLevel(
                                    e.target.value
                                )

                            }

                            className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white"

                        >

                            <option value="">

                                Select Experience

                            </option>

                            <option>

                                Fresher

                            </option>

                            <option>

                                Junior

                            </option>

                            <option>

                                Mid-Level

                            </option>

                            <option>

                                Senior

                            </option>

                        </select>

                    </div>

                </div>

                {/* Submit Button */}

                <button

                    type="submit"

                    className="w-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 py-4 rounded-xl font-semibold text-lg"

                >

                    Analyze Interview

                </button>

            </form>

        </div>

    );

};

export default UploadResumeForm;