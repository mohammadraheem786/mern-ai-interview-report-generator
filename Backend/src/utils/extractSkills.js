import skills from "../data/skills.js";

const extractSkills = (text) => {

    const normalizedText =
        text.toLowerCase();

    const extractedSkills = [];

    skills.forEach((skill) => {

        const found = skill.aliases.some(
            (alias) =>
                normalizedText.includes(
                    alias.toLowerCase()
                )
        );

        if (
            found &&
            !extractedSkills.includes(
                skill.canonical
            )
        ) {
            extractedSkills.push(
                skill.canonical
            );
        }

    });

    return extractedSkills;
};

export default extractSkills;