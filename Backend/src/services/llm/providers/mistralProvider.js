import axios from "axios";

import dotenv
from "dotenv";

import llmConfig
from "../llmConfig.js";

dotenv.config();

const generateWithMistral =
async (prompt) => {

    try {

        const response =
            await axios.post(

                "https://integrate.api.nvidia.com/v1/chat/completions",

                {

                    model:
                        llmConfig
                        .mistral
                        .model,

                    messages: [

                        {

                            role: "user",

                            content: prompt

                        }

                    ],

                    temperature:
                        llmConfig
                        .mistral
                        .temperature,

                    top_p:
                        llmConfig
                        .mistral
                        .top_p,

                    max_tokens:
                        llmConfig
                        .mistral
                        .max_tokens,

                    stream:
                        llmConfig
                        .mistral
                        .stream

                },

                {

                    headers: {

                        Authorization:

                            `Bearer ${process.env.NVIDIA_API_KEY_MISTRAL}`,

                        "Content-Type":

                            "application/json"

                    }

                }

            );

        return response
            .data
            .choices[0]
            .message
            .content;

    } catch (error) {

        console.log(

            "Mistral Provider Error:",

            error.response?.data ||
            error.message

        );

        throw new Error(
            "Mistral generation failed"
        );

    }

};

export default generateWithMistral;