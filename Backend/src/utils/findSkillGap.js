const findSkillGap = (resumeSkills, jobSkills) => {
    const matchedSkills = jobSkills.filter((skill) => resumeSkills.includes(skill));
    const missingSkills =  jobSkills.filter((skill) => !matchedSkills.includes(skill));
    return { matchedSkills, missingSkills };
};

export default findSkillGap;