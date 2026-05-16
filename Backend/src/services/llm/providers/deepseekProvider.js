import OpenAI from "openai";

import dotenv from "dotenv";

dotenv.config();

import llmConfig
from "../llmConfig.js";

const openai = new OpenAI({

    apiKey:
        process.env.NVIDIA_API_KEY,

    baseURL:
        "https://integrate.api.nvidia.com/v1"

});

const generateWithDeepSeek =
async (prompt) => {

    const completion =
        await openai.chat.completions.create({

            model:
                llmConfig.deepseek.model,

            messages: [

                {
                    role: "user",
                    content: prompt
                }

            ],

            temperature:
                llmConfig.deepseek.temperature,

            top_p:
                llmConfig.deepseek.top_p,

            max_tokens:
                llmConfig.deepseek.max_tokens,

            stream: false,

            chat_template_kwargs: {

                thinking: true,

                reasoning_effort:
                    llmConfig.deepseek
                    .reasoning_effort

            }

        });

    return completion
        .choices[0]
        .message
        .content;

};

export default generateWithDeepSeek;