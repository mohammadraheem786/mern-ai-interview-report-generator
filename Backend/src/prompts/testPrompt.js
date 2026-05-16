import buildPrompt
from "./buildPrompt.js";

const test = () => {

    const prompt = buildPrompt({

        targetRole:
            "Full Stack Developer",

        experienceLevel:
            "fresher",

        matchedSkills: [

            "javascript",
            "mongodb"

        ],

        missingSkills: [

            "react",
            "node.js",
            "express.js"

        ],

        ragContext: [

            "React interview question about Virtual DOM and reconciliation for fresher frontend developer.",

            "Node.js concurrency interview question for fresher backend developer.",

            "Express middleware interview question for fresher backend developer.",

            "Leadership behavioral interview question for fresher.",

            "Resume review for MERN stack full stack project."

        ]

    });

    console.log(prompt);

};

test();