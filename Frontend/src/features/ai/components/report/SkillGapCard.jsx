const SkillGapCard = ({ skillGapAnalysis = [], resumeSkills = [], jobSkills = [] }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">

      <h2 className="text-3xl font-bold">Skill Gap Analysis</h2>

      {/* Resume vs Job Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Resume Skills */}
        <div>
          <h3 className="text-indigo-400 font-bold text-lg mb-4">
            Your Resume Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {resumeSkills.length > 0
              ? resumeSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm"
                  >
                    {skill}
                  </span>
                ))
              : <p className="text-slate-500 text-sm">No skills found</p>
            }
          </div>
        </div>

        {/* Job Skills */}
        <div>
          <h3 className="text-purple-400 font-bold text-lg mb-4">
            Job Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {jobSkills.length > 0
              ? jobSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm"
                  >
                    {skill}
                  </span>
                ))
              : <p className="text-slate-500 text-sm">No skills found</p>
            }
          </div>
        </div>

      </div>

      {/* AI Skill Gap Analysis */}
      {skillGapAnalysis.length > 0 && (
        <div>
          <h3 className="text-yellow-400 font-bold text-lg mb-4">
            AI Recommendations
          </h3>
          <div className="space-y-3">
            {skillGapAnalysis.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm leading-relaxed"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SkillGapCard;