import buildPrompt from "../../prompts/buildPrompt.js";

import generateLLMResponse
from "./llmService.js";

const test = async () => {

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

            "React interview question about Virtual DOM and reconciliation.",

            "Node.js concurrency interview question.",

            "Express middleware interview question.",

            "Leadership behavioral interview question.",

            "Resume review for MERN stack project."

        ]

    });

    const response =
        await generateLLMResponse(
            prompt
        );

    console.log(response);

};

test();