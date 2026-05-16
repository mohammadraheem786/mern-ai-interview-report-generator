import dotenv from "dotenv";

dotenv.config();

import { GoogleGenerativeAI }
from "@google/generative-ai";

import llmConfig
from "../llmConfig.js";

const genAI =
    new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );

const model =
    genAI.getGenerativeModel({

        model:
            llmConfig.gemini.model

    });

const generateWithGemini =
async (prompt) => {

    const result =
        await model.generateContent(
            prompt
        );

    const response =
        await result.response;

    return response.text();

};

export default generateWithGemini;