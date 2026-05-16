import Groq
from "groq-sdk";

import llmConfig
from "../llmConfig.js";

const groq =
    new Groq({

        apiKey:
            process.env.GROQ_API_KEY

    });

const generateWithGroq =
async (prompt) => {

    const completion =
        await groq.chat.completions.create({

            model:
                llmConfig.groq.model,

            messages: [

                {

                    role: "user",

                    content: prompt

                }

            ],

            temperature:
                llmConfig.groq.temperature,

            max_tokens:
                llmConfig.groq.max_tokens,

            top_p:
                llmConfig.groq.top_p,

            stream: false

        });

    return completion
        .choices[0]
        .message
        .content;

};

export default generateWithGroq;