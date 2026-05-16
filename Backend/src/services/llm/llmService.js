import llmConfig
from "./llmConfig.js";

import cleanJsonResponse
from "../../utils/cleanJsonResponse.js";

import generateWithDeepSeek
from "./providers/deepseekProvider.js";

import generateWithGemini
from "./providers/geminiProvider.js";

import generateWithMistral
from "./providers/mistralProvider.js";

import generateWithGroq
from "./providers/groqProvider.js";

const generateLLMResponse =
async (prompt) => {

    try {

        let rawResponse;

        // ─────────────────────────────
        // Provider Switching
        // ─────────────────────────────

        switch (
            llmConfig.provider
        ) {
                case "groq":

                rawResponse =
                    await generateWithGroq(
                        prompt
                    );

                break;

            case "deepseek":

                rawResponse =
                    await generateWithDeepSeek(
                        prompt
                    );

                break;

            case "gemini":

                rawResponse =
                    await generateWithGemini(
                        prompt
                    );

                break;

            case "mistral":

                rawResponse =
                    await generateWithMistral(
                        prompt
                    );

                break;

            default:

                throw new Error(
                    "Invalid provider"
                );

        }

        // ─────────────────────────────
        // Clean AI Response
        // ─────────────────────────────

        const cleanedResponse =
            cleanJsonResponse(
                rawResponse
            );

        // ─────────────────────────────
        // Parse JSON
        // ─────────────────────────────

        const parsedResponse =
            JSON.parse(
                cleanedResponse
            );

        return parsedResponse;

    } catch (error) {

        console.log(

            "LLM Error:",

            error.message

        );

        throw new Error(
            "Failed to generate AI response"
        );

    }

};

export default generateLLMResponse;