import systemPrompt
from "./systemPrompt.js";

import outputFormat
from "./outputFormat.js";

const buildPrompt = ({

    targetRole,

    experienceLevel,

    matchedSkills,

    missingSkills,

    ragContext

}) => {

  const technicalContext =
    ragContext.filter((chunk) => {

        const lower =
            chunk.toLowerCase();

        return (
            lower.includes("react") ||
            lower.includes("node.js") ||
            lower.includes("express") ||
            lower.includes("mongodb") ||
            lower.includes("technical")
        );

    });

    const behavioralContext =
        ragContext.filter((chunk) =>

            chunk.toLowerCase()
            .includes("behavioral")

        );

    const resumeContext =
        ragContext.filter((chunk) =>

            chunk.toLowerCase()
            .includes("resume")

        );

    return `

${systemPrompt}

Candidate Information:

Target Role:
${targetRole}

Experience Level:
${experienceLevel}

Matched Skills:
${matchedSkills.join(", ")}

Missing Skills:
${missingSkills.join(", ")}

Technical Knowledge Context:

${technicalContext.join("\n\n")}

Behavioral Knowledge Context:

${behavioralContext.join("\n\n")}

Resume Review Context:

${resumeContext.join("\n\n")}

Tasks:

1. Analyze candidate strengths
2. Analyze candidate weaknesses
3. Explain missing critical skills
4. Generate interview readiness analysis
5. Generate learning roadmap
6. Generate technical interview questions
7. Generate behavioral interview questions
8. Generate final readiness score

${outputFormat}

`;

};

export default buildPrompt;